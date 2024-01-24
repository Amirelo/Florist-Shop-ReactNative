import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ItemProduct, ItemRow} from '../../../components/molecules';
import {ProductModel} from '../../../models';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFilter, faSort, faTableColumns} from '@fortawesome/free-solid-svg-icons';
import {CustomText} from '../../../components/atoms';

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
    <View style={styles.view}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <ItemRow
        justifyContent="flex-start"
        leftWidget={
          <FontAwesomeIcon style={{marginRight: 4}} icon={faFilter} />
        }
        rightWidget={<CustomText>Filter</CustomText>}
      />

      <ItemRow
        justifyContent="flex-start"
        leftWidget={
          <FontAwesomeIcon style={{marginRight: 4}} icon={faSort} />
        }
        rightWidget={<CustomText>Sort</CustomText>}
      />

      <ItemRow
        justifyContent="flex-start"
        leftWidget={
          <FontAwesomeIcon style={{marginRight: 4}} icon={faTableColumns} />
        }
        rightWidget={<CustomText>Column</CustomText>}
      />
      </View>

      <FlatList
        columnWrapperStyle={{justifyContent: 'space-around', marginBottom: 24}}
        style={{marginTop: 24}}
        numColumns={2}
        data={productList}
        keyExtractor={item => item.name}
        renderItem={({item}) => <ItemProduct product={item} />}
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  view:{
    paddingHorizontal:16
  }
})
