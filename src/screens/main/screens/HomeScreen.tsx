import React from 'react';
import CustomText from '../../../components/atoms/CustomText';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import CardHelp from '../../../components/molecules/CardHelp';
import CategoryModel from '../../../models/CategoryModel';
import ItemCategory from '../../../components/molecules/ItemCategory';
import ItemProductBig from '../../../components/molecules/ItemProductBig';
import ProductModel from '../../../models/ProductModel';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getCategories, getProducts} from '../MainService';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {
  IMAGE_HOME_HEADER,
  IMAGE_HOME_HEADER_DARK,
  NAVIGATION_BOTTOM_TAB_EXPLORE,
  NAVIGATION_MAIN_ABOUTUS,
  NAVIGATION_MAIN_PRODUCT_DETAIL,
} from '../../../constants/AppConstants';
import {SafeAreaView} from 'react-native-safe-area-context';
import lang from '../../../language/lang';
import {useSelector} from 'react-redux';
import CustomView from '../../../components/atoms/CustomView';

const HomeScreen = () => {
  // Navigation
  const navigation = useNavigation<NavigationProp<any>>();

  // Store list get from server
  const [listCategories, setListCategories] =
    React.useState<Array<CategoryModel>>();
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>();

  // Saved language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  const onCategoryPressed = (name: string) => {
    navigation.navigate(NAVIGATION_BOTTOM_TAB_EXPLORE, {
      data: {listCategories: [name]},
    });
  };

  // Navigate to Product Detail Screen with item
  const onProductPressed = (item: ProductModel) => {
    navigation.navigate(NAVIGATION_MAIN_PRODUCT_DETAIL, {item: item});
  };

  // Load data from server
  const waitForData = async () => {
    const categories: Array<CategoryModel> = (await getCategories()).slice(
      0,
      3,
    );
    console.log('category list: ', categories);
    setListCategories(categories.slice(0, 3));
    const more = new CategoryModel(
      '1',
      'See More',
      'https://images.pexels.com/photos/15387083/pexels-photo-15387083/free-photo-of-letters-on-dice.jpeg',
    );
    setListCategories([...categories, more]);

    const products: Array<ProductModel> = await getProducts();
    console.log('product list: ', products);
    setListProducts(products);
  };

  // On Need Help Card Pressed
  const onHelpCardPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_ABOUTUS);
  };

  // Load data first time screen is load
  React.useEffect(() => {
    waitForData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <CustomView type='body'>
          <CardHelp
            title={'Welcome!'}
            height={200}
            backgroundImage={[IMAGE_HOME_HEADER, IMAGE_HOME_HEADER_DARK]}
            marginBottom={24}
          />

          <CardHelp
            title={lang[langPref]['home_card_title']}
            description={lang[langPref]['home_card_description']}
            icon={faCalendarDay}
            marginBottom={24}
            onPressed={onHelpCardPressed}
          />

          <CustomText type="title" marginBottom={20}>
            Search by occasions
          </CustomText>

          <FlatList
            style={{marginBottom: 32}}
            contentContainerStyle={{
              justifyContent: 'space-between',
              width: '100%',
            }}
            horizontal={true}
            data={listCategories}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <ItemCategory
                category={item}
                onPressed={name => onCategoryPressed(name)}
              />
            )}
          />

          <CustomText type="title" marginBottom={24}>
            {lang[langPref]['home_popular']}
          </CustomText>
          <FlatList
            style={{marginBottom: 30}}
            contentContainerStyle={{
              justifyContent: 'space-between',
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={listProducts}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ItemProductBig
                onPressed={() => onProductPressed(item)}
                product={item}
                langPref={langPref}
              />
            )}
          />
        </CustomView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;