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
import {langText} from '../../../utils/Utils';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {IMAGE_HOME_HEADER} from '../../../constants/AppConstants';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  // Navigation
  const navigation = useNavigation<NavigationProp<any>>();

  // Store list get from server
  const [listCategories, setListCategories] =
    React.useState<Array<CategoryModel>>();
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>();

  // Navigate to Product Detail Screen with item
  const onProductPressed = (item: ProductModel) => {
    navigation.navigate('ProductDetail', {item: item});
  };

  // Load data from server
  const waitForData = async () => {
    const categories: Array<CategoryModel> = await getCategories();
    console.log('category list: ', categories);
    setListCategories(categories);

    const products: Array<ProductModel> = await getProducts();
    console.log('product list: ', products);
    setListProducts(products);
  };

  // Load data first time screen is load
  React.useEffect(() => {
    waitForData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.view]}>
          <CardHelp
            title={'Welcome!'}
            height={'20%'}
            backgroundImage={IMAGE_HOME_HEADER}
            marginBottom={24}
          />

          <CardHelp
            title={langText('home_card_title')}
            description={langText('home_card_description')}
            icon={faCalendarDay}
            marginBottom={24}
          />
          <FlatList
            style={{marginBottom: 32}}
            contentContainerStyle={{
              justifyContent: 'space-between',
              width: '100%',
            }}
            horizontal={true}
            data={listCategories?.slice(0, 4)}
            keyExtractor={item => item.name}
            renderItem={({item}) => <ItemCategory category={item} />}
          />

          <CustomText type="title" marginBottom={24}>
            {langText('home_popular')}
          </CustomText>
          <FlatList
            style={{marginBottom: 30}}
            contentContainerStyle={{
              justifyContent: 'space-between',
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={listProducts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ItemProductBig
                onPressed={() => onProductPressed(item)}
                product={item}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
});
