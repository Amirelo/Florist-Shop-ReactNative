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
import {getProducts} from '../MainService';
import lang from '../../../language/lang';
import {useSelector} from 'react-redux';

const ExploreScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();

  // Fields
  const [isColumn, setIsColumn] = React.useState(false);
  const [filteredList, setFilteredList] = React.useState<Array<ProductModel>>(
    [],
  );
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>(
    [],
  );
  const [sortText, setSortText] = React.useState('')
  const [panelActive, setPanelActive] = React.useState(false);

  // Saved language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  const onFilterPressed = () => {
    navigation.navigate('Filter');
  };

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
    var text = ''
    console.log('Sort pressed');
    type == 'NAME_ASC' ? (
      filteredList.sort((a, b) => a.name.localeCompare(b.name)),
      text = 'Name Asc'
    ) : type == 'NAME_DESC' ? (
      filteredList.sort((a, b) => b.name.localeCompare(a.name)),
      text = 'Name Desc'
    ) : type == 'PRICE_ASC' ? (
      filteredList.sort((a, b) => a.price - b.price),
      text = 'Price Asc'
    ) : type == 'PRICE_DESC' ? (
      filteredList.sort((a, b) => b.price - a.price),
      text = 'Price Desc'
    ) : (
      <></>
    );
    setFilteredList(filteredList);
    setSortText(text)
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
    waitForData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.view}>
        <CustomInput
          onChangeText={text => onSearch(text)}
          icon={faSearch}
          marginBottom={12}
          placeholder={lang[langPref]['edSearch']}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CustomButton onPressed={onFilterPressed} flex={1}>
            <ItemRow justifyContent="flex-start">
              <FontAwesomeIcon style={{marginRight: 4}} icon={faSliders} />
              <CustomText type="subTitle">
                {lang[langPref]['text_filter']}
              </CustomText>
            </ItemRow>
          </CustomButton>

          <CustomButton onPressed={onSortPressed} flex={1}>
            <ItemRow justifyContent="center">
              <FontAwesomeIcon style={{marginRight: 4}} icon={faSort} />
              <CustomText type="subTitle">
                {sortText ? sortText : lang[langPref]['text_sort']}
              </CustomText>
            </ItemRow>
          </CustomButton>

          <CustomButton onPressed={onDisplayPressed} flex={1}>
            <ItemRow justifyContent="flex-end">
              <FontAwesomeIcon
                style={{marginRight: 4}}
                icon={isColumn ? faSquareFull : faGripVertical}
              />
              <CustomText type="subTitle">
                {isColumn
                  ? lang[langPref]['text_display_column']
                  : lang[langPref]['text_display_grid']}
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
                langPref={langPref}
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
                langPref={langPref}
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
