import React from 'react';
import CustomText from '../../../components/atoms/CustomText';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import CardHelp from '../../../components/molecules/CardHelp';
import CategoryModel from '../../../models/CategoryModel';
import ItemCategory from '../../../components/molecules/ItemCategory';
import ItemProductBig from '../../../components/molecules/ItemProductBig';
import ProductModel from '../../../models/ProductModel';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getCategories } from '../MainService';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  var list = new Array<CategoryModel>();

  const [listCategories, setListCategories] = React.useState<Array<CategoryModel>>()

  var productList = new Array<ProductModel>();
  var testProduct = new ProductModel(1, 'Spark', 35, 5, 'A bouquet', 2.4, 1, [
    'https://images.pexels.com/photos/230129/pexels-photo-230129.jpeg',
  ]);
  productList.push(testProduct);
  testProduct = new ProductModel(2, 'Bomb', 75, 5, 'A bouquet', 3.6, 1, [
    'https://images.pexels.com/photos/953057/pexels-photo-953057.jpeg',
  ]);
  productList.push(testProduct);
  testProduct = new ProductModel(3, 'Rot', 13, 5, 'A bouquet', 4.3, 1, [
    'https://images.pexels.com/photos/2099737/pexels-photo-2099737.jpeg',
  ]);
  productList.push(testProduct);
  testProduct = new ProductModel(4, 'Roto', 36, 5, 'A bouquet', 5, 1, [
    'https://images.pexels.com/photos/250716/pexels-photo-250716.jpeg',
  ]);
  productList.push(testProduct);
  testProduct = new ProductModel(5, 'Comb', 78, 5, 'A bouquet', 1.2, 1, [
    'https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg',
  ]);
  productList.push(testProduct);
  testProduct = new ProductModel(6, 'Sap', 54, 5, 'A bouquet', 3.6, 1, [
    'https://images.pexels.com/photos/18011894/pexels-photo-18011894/free-photo-of-tea-glasses-on-windowsill.jpeg',
  ]);
  productList.push(testProduct);

  const onProductPressed = (item: ProductModel) => {
    navigation.navigate('ProductDetail', {item: item})
  }

  const waitForData = async() =>{
    const categories: Array<CategoryModel> = await getCategories()
    console.log('category list: ',categories)
    setListCategories(categories)
  }

  React.useEffect(()=>{
    waitForData()
  },[])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.view}>
        <CustomText type="header" marginTop={27} marginBottom={24}>
          Welcome!
        </CustomText>
        <CardHelp marginBottom={24} />
        <FlatList
          style={{marginBottom: 32}}
          contentContainerStyle={{
            justifyContent: 'space-between',
            width: '100%',
          }}
          horizontal={true}
          data={listCategories?.slice(0,4)}
          keyExtractor={item => item.name}
          renderItem={({item}) => <ItemCategory category={item} />}
        />

        <CustomText type="title" marginBottom={24}>
          Popularity
        </CustomText>
        <FlatList
          style={{marginBottom: 32}}
          contentContainerStyle={{
            justifyContent: 'space-between',
            flexGrow: 1,
            gap: 24,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={productList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ItemProductBig onPressed={() => onProductPressed(item)} product={item} />}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
  },
});
