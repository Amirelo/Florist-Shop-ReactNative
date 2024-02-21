// React and libs
import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';

// Constants
import {
  IMAGE_HOME_HEADER,
  IMAGE_HOME_HEADER_DARK,
  NAVIGATION_BOTTOM_TAB_EXPLORE,
  NAVIGATION_MAIN_ABOUTUS,
  NAVIGATION_MAIN_PRODUCT_DETAIL,
} from '../../../constants/AppConstants';

// Models
import {CategoryModel, ProductModel} from '../../../models';

// Services
import {getCategories, getProducts} from '../MainService';

// Components
import {CustomText, CustomView} from '../../../components/atoms';
import {
  CardHelp,
  ItemCategory,
  ItemProductBig,
} from '../../../components/molecules';

// User Preferences
import lang from '../../../language/lang';

const HomeScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Fields
  const [listCategories, setListCategories] =
    React.useState<Array<CategoryModel>>();
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>();

  // Navigate - ExploreScreen with filter
  const onCategoryPressed = (name: string) => {
    navigation.navigate(NAVIGATION_BOTTOM_TAB_EXPLORE, {
      filter: {categories: [name]},
    });
  };

  // Navigate - ProductDetailScreen with product
  const onProductPressed = (item: ProductModel) => {
    navigation.navigate(NAVIGATION_MAIN_PRODUCT_DETAIL, {item: item});
  };

  // Load data from server
  const waitForData = async () => {
    const categories: Array<CategoryModel> = (await getCategories()).slice(
      0,
      4,
    );
    console.log('category list: ', categories);
    setListCategories(categories);

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
    <CustomView type="fullscreen">
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomView type="body">
          {/* Header - Welcome */}
          <CardHelp
            title={lang[langPref].home_header}
            height={200}
            backgroundImage={[IMAGE_HOME_HEADER, IMAGE_HOME_HEADER_DARK]}
            marginBottom={24}
          />

          {/* Header - Need Help */}
          <CardHelp
            title={lang[langPref].home_card_title}
            description={lang[langPref].home_card_description}
            icon={faCalendarDay}
            marginBottom={24}
            onPressed={onHelpCardPressed}
          />

          {/* Title - Categories */}
          <CustomText type="title" marginBottom={20}>
            {lang[langPref].home_occasions}
          </CustomText>

          {/* List - Categories */}
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

          {/* Title - Popular */}
          <CustomText type="title" marginBottom={24}>
            {lang[langPref]['home_popular']}
          </CustomText>
          {/* List - Popular */}
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
    </CustomView>
  );
};

export default HomeScreen;
