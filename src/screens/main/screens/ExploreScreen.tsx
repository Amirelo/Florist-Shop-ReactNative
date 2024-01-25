import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  ItemProduct,
  ItemProductBig,
  ItemProductLong,
} from '../../../components/molecules';
import {CustomButton, ItemRow} from '../../../components/atoms';
import {ProductModel} from '../../../models';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFilter,
  faSort,
  faTableColumns,
} from '@fortawesome/free-solid-svg-icons';
import {CustomText} from '../../../components/atoms';

const ExploreScreen = () => {
  const [isColumn, setIsColumn] = React.useState(true);

  const onDisplayPressed = () => {
    setIsColumn(!isColumn);
  };

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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ItemRow justifyContent="flex-start">
          <FontAwesomeIcon style={{marginRight: 4}} icon={faFilter} />
          <CustomText>Filter</CustomText>
        </ItemRow>

        <ItemRow justifyContent="flex-start">
          <FontAwesomeIcon style={{marginRight: 4}} icon={faSort} />
          <CustomText>Sort</CustomText>
        </ItemRow>

      <CustomButton onPressed={onDisplayPressed}>
        <ItemRow justifyContent="flex-start">
          <FontAwesomeIcon style={{marginRight: 4}} icon={faTableColumns} />
          <CustomText>Column</CustomText>
        </ItemRow>
        </CustomButton>
      </View>
      {isColumn ? (
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-around',
            marginBottom: 24,
          }}
          style={{marginTop: 24}}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={productList}
          keyExtractor={item => item.name}
          renderItem={({item}) => <ItemProduct product={item} />}
        />
      ) : (
        <FlatList
          key={'#'}
          contentContainerStyle={{gap: 16}}
          style={{marginTop: 24}}
          showsVerticalScrollIndicator={false}
          data={productList}
          keyExtractor={item => item.name}
          renderItem={({item}) => <ItemProductLong product={item} />}
        />
      )}
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
  },
});
