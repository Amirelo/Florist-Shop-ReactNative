import React from 'react';
import CustomText from '../../../components/atoms/CustomText';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import CardHelp from '../../../components/molecules/CardHelp';
import CategoryModel from '../../../models/CategoryModel';
import ItemCategory from '../../../components/molecules/ItemCategory';
import ItemProductBig from '../../../components/molecules/ItemProductBig';
import ProductModel from '../../../models/ProductModel';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getCategories, getProducts } from '../MainService';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  var list = new Array<CategoryModel>();

  const [listCategories, setListCategories] = React.useState<Array<CategoryModel>>()
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>()

  const onProductPressed = (item: ProductModel) => {
    navigation.navigate('ProductDetail', {item: item})
  }

  const waitForData = async() =>{
    const categories: Array<CategoryModel> = await getCategories()
    console.log('category list: ',categories)
    setListCategories(categories)

    const products: Array<ProductModel> = await getProducts()
    console.log('product list: ',products)
    setListProducts(products)
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
          data={listProducts}
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
