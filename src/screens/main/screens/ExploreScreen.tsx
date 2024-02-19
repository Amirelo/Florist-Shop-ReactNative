import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  CustomInput,
  ItemProduct,
  ItemProductLong,
  OptionsPanel,
} from '../../../components/molecules';
import {CustomButton, CustomView, ItemRow} from '../../../components/atoms';
import {ProductModel, UserModel} from '../../../models';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faGripVertical,
  faSearch,
  faSliders,
  faSort,
  faSquareFull,
} from '@fortawesome/free-solid-svg-icons';
import {CustomText} from '../../../components/atoms';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {getProducts} from '../MainService';
import lang from '../../../language/lang';
import {useSelector} from 'react-redux';
import {priceFormat} from '../../../utils/Utils';
import {
  NAVIGATION_MAIN_PRODUCT_DETAIL,
  NAVIGATION_MAIN_PRODUCT_FILTER,
} from '../../../constants/AppConstants';
import themes from '../../../themes/themes';
import { TextButton } from '../../../components/molecules/buttons';

const ExploreScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  // Fields
  const [isColumn, setIsColumn] = React.useState(false);
  const [filteredList, setFilteredList] = React.useState<Array<ProductModel>>(
    [],
  );
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>(
    [],
  );
  const [sortText, setSortText] = React.useState('');
  const [panelActive, setPanelActive] = React.useState(false);

  // Saved language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );

  const onFilterPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_PRODUCT_FILTER);
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
    var text = '';
    console.log('Sort pressed');
    type == 'NAME_ASC' ? (
      (filteredList.sort((a, b) => a.name.localeCompare(b.name)),
      (text = 'Name Asc'))
    ) : type == 'NAME_DESC' ? (
      (filteredList.sort((a, b) => b.name.localeCompare(a.name)),
      (text = 'Name Desc'))
    ) : type == 'PRICE_ASC' ? (
      (filteredList.sort((a, b) => a.price - b.price), (text = 'Price Asc'))
    ) : type == 'PRICE_DESC' ? (
      (filteredList.sort((a, b) => b.price - a.price), (text = 'Price Desc'))
    ) : (
      <></>
    );
    setFilteredList(filteredList);
    setSortText(text);
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
    navigation.navigate(NAVIGATION_MAIN_PRODUCT_DETAIL, {item: item});
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

  React.useEffect(() => {
    if (route.params?.filter) {
      var filterData: any = [];
      console.log('Filter found:', route.params.filter);
      filterData = route.params.filter;
      var filteredList = listProducts;
      if (filterData.minPrice) {
        filteredList = filteredList.filter(
          item => item.price > filterData.minPrice,
        );
        console.log('Filter - min price:', filteredList);
      }
      if (filterData.minPrice) {
        filteredList = filteredList.filter(
          item => item.price < filterData.maxPrice,
        );
        console.log('Filter - max price:', filteredList);
      }

      if (filterData.categories.length > 0) {
        filteredList = filteredList.filter((product: ProductModel) => {
          var status = false;
          filterData.categories.map((name: string) => {
            if (product.categories.includes(name)) {
              status = true;
            }
          });
          return status;
        });
        console.log('Filter - categories:', filteredList);
      }

      if (filterData.colors.length > 0) {
        filteredList = filteredList.filter((product: ProductModel) => {
          var status = false;
          filterData.colors.map((name: string) => {
            if (product.colors.includes(name)) {
              status = true;
            }
          });
          return status;
        });
        console.log('Filter - colors:', filteredList);
      }

      setFilteredList(filteredList);
    }
  }, [route]);

  return (
    <CustomView type="viewWithOptions">
      <CustomView type="body">
        {/* Search bar */}
        <CustomInput
          onChangeText={text => onSearch(text)}
          icon={faSearch}
          marginBottom={12}
          placeholder={lang[langPref]['edSearch']}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* Button - Filter */}
          <CustomButton onPressed={onFilterPressed} flex={1}>
            <ItemRow justifyContent="flex-start">
              <FontAwesomeIcon
                color={themes[currentTheme].textColor}
                style={{marginRight: 4}}
                icon={faSliders}
              />
              <CustomText type="subTitle">
                {lang[langPref]['text_filter']}
              </CustomText>
            </ItemRow>
          </CustomButton>

          {/* Button - Sort */}
          <CustomButton onPressed={onSortPressed} flex={1}>
            <ItemRow justifyContent="center">
              <FontAwesomeIcon
                color={themes[currentTheme].textColor}
                style={{marginRight: 4}}
                icon={faSort}
              />
              <CustomText type="subTitle">
                {sortText ? sortText : lang[langPref]['text_sort']}
              </CustomText>
            </ItemRow>
          </CustomButton>

          {/* Button - Display */}
          <CustomButton onPressed={onDisplayPressed} flex={1}>
            <ItemRow justifyContent="flex-end">
              <FontAwesomeIcon
                color={themes[currentTheme].textColor}
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

        {/* Flatlist */}
        {isColumn == false ? (
          // 2 column
          <FlatList
            key="@"
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
          // 1 Column
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
      </CustomView>
      {/* Option Panel: Sort */}
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
    </CustomView>
  );
};

export default ExploreScreen;
