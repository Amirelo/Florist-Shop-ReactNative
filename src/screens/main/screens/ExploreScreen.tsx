import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  ItemProduct,
  ItemProductLong,
} from '../../../components/molecules';
import {CustomButton, ItemRow} from '../../../components/atoms';
import {ProductModel} from '../../../models';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFilter,
  faGripVertical,
  faSliders,
  faSort,
  faSquareFull,
  faTableColumns,
} from '@fortawesome/free-solid-svg-icons';
import {CustomText} from '../../../components/atoms';

const ExploreScreen = () => {
  const [isColumn, setIsColumn] = React.useState(false);

  const onDisplayPressed = () => {
    setIsColumn(!isColumn);
  };

  var productList = new Array<ProductModel>();
  var testProduct = new ProductModel(1,'Spark', 90, 5, 'A bouquet', 2.4, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  productList.push(testProduct);
  testProduct = new ProductModel(2,'Spark', 90, 5, 'A bouquet', 2.4, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  productList.push(testProduct);
  testProduct = new ProductModel(3,'Spark', 90, 5, 'A bouquet', 2.4, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  productList.push(testProduct);
  testProduct = new ProductModel(4,'Spark', 90, 5, 'A bouquet', 2.4, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  productList.push(testProduct);
  testProduct = new ProductModel(5,'Spark', 90, 5, 'A bouquet', 2.4, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  productList.push(testProduct);
  testProduct = new ProductModel(6,'Spark', 90, 5, 'A bouquet', 2.4, 1, [
    'https://cdn.pixabay.com/photo/2024/01/12/21/23/cortina-dampezzo-8504755_1280.jpg',
  ]);
  productList.push(testProduct);
  return (
    <View style={styles.view}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ItemRow justifyContent="flex-start">
          <FontAwesomeIcon style={{marginRight: 4}} icon={faSliders} />
          <CustomText>Filter</CustomText>
        </ItemRow>

        <ItemRow justifyContent="flex-start">
          <FontAwesomeIcon style={{marginRight: 4}} icon={faSort} />
          <CustomText>Sort</CustomText>
        </ItemRow>

      <CustomButton onPressed={onDisplayPressed}>
        <ItemRow justifyContent="flex-start">
          <FontAwesomeIcon style={{marginRight: 4}} icon={isColumn ? faSquareFull : faGripVertical} />
          <CustomText>{isColumn ? "Column" : "Grid"}</CustomText>
        </ItemRow>
        </CustomButton>
      </View>
      {isColumn ==false ? (
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-around',
            marginBottom: 24,
          }}
          style={{marginTop: 24}}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={productList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ItemProduct product={item} />}
        />
      ) : (
        <FlatList
          key={'#'}
          contentContainerStyle={{gap: 16}}
          style={{marginTop: 24}}
          showsVerticalScrollIndicator={false}
          data={productList}
          keyExtractor={item => item.id.toString()}
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
