import React from 'react';
import {FlatList, View} from 'react-native';
import {ItemProduct} from '../../../components/molecules';
import {ProductModel} from '../../../models';

const ExploreScreen = () => {
  var productList = new Array<ProductModel>();
  const testProduct = new ProductModel('Spark', 90, 5, 'A bouquet', 2.4, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  productList.push(testProduct);
  productList.push(testProduct);
  productList.push(testProduct);
  productList.push(testProduct);
  productList.push(testProduct);
  productList.push(testProduct);
  return (
    <View>
      <FlatList
        columnWrapperStyle={{justifyContent:'space-around',marginBottom:24}}
        style={{marginTop:24}}
        numColumns={2}
        data={productList}
        keyExtractor={item => item.name}
        renderItem={({item}) => <ItemProduct product={item} />}
      />
    </View>
  );
};

export default ExploreScreen;
