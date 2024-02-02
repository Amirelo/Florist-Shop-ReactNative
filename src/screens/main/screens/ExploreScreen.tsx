import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  CustomInput,
  ItemProduct,
  ItemProductLong,
  OptionsPanel,
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
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { getProducts } from '../MainService';
import { langText } from '../../../utils/Utils';

const ExploreScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  
  // Fields
  const [isColumn, setIsColumn] = React.useState(false);
  const [filteredList, setFilteredList] = React.useState<Array<ProductModel>>(
    [],
  );
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>([])
  const [panelActive, setPanelActive] = React.useState(false);

    // Change product display mode
  const onDisplayPressed = () => {
    setIsColumn(!isColumn);
  };

  // Show option panel (sort order)
  const onSortPressed = () => {
    setPanelActive(true);
  };

  // Sort products by selected options
  const onSortOptionSelected = (type: string) => {
    console.log('Sort pressed');
    type == 'NAME_ASC' ? (
      filteredList.sort((a, b) => a.name.localeCompare(b.name))
    ) : type == 'NAME_DESC' ? (
      filteredList.sort((a, b) => b.name.localeCompare(a.name))
    ) : type == 'PRICE_ASC' ? (
      filteredList.sort((a, b) => a.price - b.price)
    ) : type == 'PRICE_DESC' ? (
      filteredList.sort((a, b) => b.price - a.price)
    ) : (
      <></>
    );
    setFilteredList(filteredList);
    setPanelActive(false);
  };

  // Filter list on search
  const onSearch = (searchText: string) => {
    var filtered = listProducts.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredList(filtered);
  };

  // Navigate to Product Detail Screen on item pressed
  const onProductPressed = (item: ProductModel) => {
    navigation.navigate('ProductDetail', {item: item});
  };

  // Get data from server
  const waitForData = async () => {
    const products: Array<ProductModel> = await getProducts();
    console.log('product list: ', products);
    setListProducts(products);
    setFilteredList(products);
  };

  // Run at the beginning
  React.useEffect(() => {
    waitForData()
  }, []);


  return (
    <View style={{flex: 1}}>
      <View style={styles.view}>
        <CustomInput
          onChangeText={text => onSearch(text)}
          icon={faSearch}
          marginBottom={12}
          placeholder={langText('edSearch')}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ItemRow justifyContent="flex-start">
            <FontAwesomeIcon style={{marginRight: 4}} icon={faSliders} />
            <CustomText type="subTitle">{langText('text_filter')}</CustomText>
          </ItemRow>

          <CustomButton onPressed={onSortPressed}>
            <ItemRow justifyContent="flex-start">
              <FontAwesomeIcon style={{marginRight: 4}} icon={faSort} />
              <CustomText type="subTitle">{langText('text_sort')}</CustomText>
            </ItemRow>
          </CustomButton>

          <CustomButton onPressed={onDisplayPressed}>
            <ItemRow justifyContent="flex-start">
              <FontAwesomeIcon
                style={{marginRight: 4}}
                icon={isColumn ? faSquareFull : faGripVertical}
              />
              <CustomText type="subTitle">
                {isColumn ? langText('text_display_column') : langText('text_display_grid')}
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
            renderItem={({item}) => (
              <ItemProduct
                onPressed={() => onProductPressed(item)}
                product={item}
              />
            )}
          />
        ) : (
          <FlatList
            key={'#'}
            contentContainerStyle={{gap: 16, paddingBottom: 20}}
            style={{marginTop: 24}}
            showsVerticalScrollIndicator={false}
            data={filteredList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ItemProductLong
                onPressed={() => onProductPressed(item)}
                product={item}
              />
            )}
          />
        )}
      </View>
      {panelActive ? (
        <OptionsPanel title="Sort" setActive={setPanelActive}>
          <CustomButton onPressed={() => onSortOptionSelected('NAME_ASC')}>
            <CustomText type="subTitle" marginBottom={8}>
              Name Asc
            </CustomText>
          </CustomButton>
          <CustomButton onPressed={() => onSortOptionSelected('NAME_DESC')}>
            <CustomText type="subTitle" marginBottom={8}>
              Name Desc
            </CustomText>
          </CustomButton>
          <CustomButton onPressed={() => onSortOptionSelected('PRICE_DESC')}>
            <CustomText type="subTitle" marginBottom={8}>
              Price Desc
            </CustomText>
          </CustomButton>
          <CustomButton onPressed={() => onSortOptionSelected('PRICE_ASC')}>
            <CustomText type="subTitle" marginBottom={8}>
              Price Asc
            </CustomText>
          </CustomButton>
        </OptionsPanel>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 20,
    flex: 1,
  },
});
