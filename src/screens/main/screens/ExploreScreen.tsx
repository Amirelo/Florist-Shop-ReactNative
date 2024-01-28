import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {
  CustomInput,
  ItemProduct,
  ItemProductLong,
} from '../../../components/molecules';
import {CustomButton, ItemRow} from '../../../components/atoms';
import {ProductModel} from '../../../models';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faGripVertical,
  faSearch,
  faSliders,
  faSort,
  faSquareFull,
} from '@fortawesome/free-solid-svg-icons';
import {CustomText} from '../../../components/atoms';

const ExploreScreen = () => {
  const [isColumn, setIsColumn] = React.useState(false);
  const [filteredList, setFilteredList] = React.useState<Array<ProductModel>>(
    [],
  );

  const onDisplayPressed = () => {
    setIsColumn(!isColumn);
  };

  const onSearch = (searchText: string) => {
    var filtered = productList.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredList(filtered);
  };

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

  React.useEffect(() => {
    setFilteredList(productList);
  }, []);

  return (
    <View style={{flex:1}}>
      <View style={styles.view}>
        <CustomInput
          onChangeText={text => onSearch(text)}
          icon={faSearch}
          marginBottom={12}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ItemRow justifyContent="flex-start">
            <FontAwesomeIcon style={{marginRight: 4}} icon={faSliders} />
            <CustomText type="subTitle">Filter</CustomText>
          </ItemRow>

          <ItemRow justifyContent="flex-start">
            <FontAwesomeIcon style={{marginRight: 4}} icon={faSort} />
            <CustomText type="subTitle">Sort</CustomText>
          </ItemRow>

          <CustomButton onPressed={onDisplayPressed}>
            <ItemRow justifyContent="flex-start">
              <FontAwesomeIcon
                style={{marginRight: 4}}
                icon={isColumn ? faSquareFull : faGripVertical}
              />
              <CustomText type="subTitle">
                {isColumn ? 'Colm' : 'Grid'}
              </CustomText>
            </ItemRow>
          </CustomButton>
        </View>
        {isColumn == false ? (
          <FlatList
            columnWrapperStyle={{
              justifyContent: 'space-around',
              marginBottom: 24,
            }}
            style={{marginTop: 24}}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={filteredList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <ItemProduct product={item} />}
          />
        ) : (
          <FlatList
            key={'#'}
            contentContainerStyle={{gap: 16, paddingBottom:20}}
            style={{marginTop: 24}}
            showsVerticalScrollIndicator={false}
            data={filteredList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <ItemProductLong product={item} />}
          />
        )}
      </View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 20,
    flex:1
  },
});
