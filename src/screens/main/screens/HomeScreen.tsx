import React from 'react';
import lang from '../../../language/lang';
import CustomText from '../../../components/atoms/CustomText';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import CardHelp from '../../../components/molecules/CardHelp';
import CategoryModel from '../../../components/models/CategoryModel';
import ItemCategory from '../../../components/molecules/ItemCategory';
import ItemProductBig from '../../../components/molecules/ItemProductBig';
import ProductModel from '../../../components/models/ProductModel';

const HomeScreen = () => {
  var list = new Array<CategoryModel>();
  const testCategory = new CategoryModel(
    'Bouquet',
    'https://images.pexels.com/photos/67567/bridal-bouquet-bride-bridal-bouquet-67567.jpeg',
  );
  list.push(testCategory);
  const testCategory1 = new CategoryModel(
    'Flower',
    'https://images.pexels.com/photos/68507/spring-flowers-flowers-collage-floral-68507.jpeg',
  );
  list.push(testCategory1);
  const testCategory2 = new CategoryModel(
    'Seeds',
    'https://images.pexels.com/photos/401213/pexels-photo-401213.jpeg',
  );
  list.push(testCategory2);
  const testCategory3 = new CategoryModel(
    'Tools',
    'https://images.pexels.com/photos/6913493/pexels-photo-6913493.jpeg',
  );
  list.push(testCategory3);
  console.log(list);

  var productList = new Array<ProductModel>();
  const testProduct = new ProductModel('Spark', 90, 'A bouquet', 2.4, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  productList.push(testProduct);
  productList.push(testProduct);
  productList.push(testProduct);

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
          data={list}
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
          keyExtractor={item => item.name}
          renderItem={({item}) => <ItemProductBig product={item} />}
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