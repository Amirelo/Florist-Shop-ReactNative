// React and libs
import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faGripVertical,
  faSearch,
  faSliders,
  faSort,
  faSquareFull,
} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';

// Constants
import {
  NAVIGATION_MAIN_PRODUCT_DETAIL,
  NAVIGATION_MAIN_PRODUCT_FILTER,
} from '../../../constants/AppConstants';

// Models
import {ProductModel} from '../../../models';

// Services
import {getProducts} from '../MainService';

// Components
import {
  CustomButton,
  CustomView,
  ItemRow,
  CustomText,
} from '../../../components/atoms';
import {
  CustomInput,
  ItemProduct,
  ItemProductLong,
  OptionsPanel,
} from '../../../components/molecules';

// User Preferences
import lang from '../../../language/lang';

import themes from '../../../themes/themes';

const ExploreScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );

  // Fields
  const [isColumn, setIsColumn] = React.useState(false);
  const [filteredList, setFilteredList] = React.useState<Array<ProductModel>>(
    [],
  );
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>(
    [],
  );
  const [sortText, setSortText] = React.useState('');
  const [filterParams, setFilterParams] = React.useState<any>();

  // Option panel - sort
  const [panelActive, setPanelActive] = React.useState(false);

  // Navigate - ProductFilterScreen
  const onFilterPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_PRODUCT_FILTER, {filter: filterParams});
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
      (text = lang[langPref].sort_name_asc))
    ) : type == 'NAME_DESC' ? (
      (filteredList.sort((a, b) => b.name.localeCompare(a.name)),
      (text = lang[langPref].sort_name_desc))
    ) : type == 'PRICE_ASC' ? (
      (filteredList.sort((a, b) => a.price - b.price),
      (text = lang[langPref].sort_price_asc))
    ) : type == 'PRICE_DESC' ? (
      (filteredList.sort((a, b) => b.price - a.price),
      (text = lang[langPref].sort_price_desc))
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

  // Update when navigate to from route
  React.useEffect(() => {
    if (route.params?.filter) {
      setFilterParams(route.params.filter);
      var filterData: any = [];
      console.log('Filter found:', route.params.filter);
      filterData = route.params.filter;
      var filteredList = listProducts;
      // Filter - min price
      if (filterData.minPrice) {
        filteredList = filteredList.filter(
          item => item.price > filterData.minPrice,
        );
        console.log('Filter - min price:', filteredList);
      }
      // Filter - max price
      if (filterData.maxPrice) {
        filteredList = filteredList.filter(
          item => item.price < filterData.maxPrice,
        );
        console.log('Filter - max price:', filteredList);
      }

      // Filter - categories
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

      // Filter - colors
      if (filterData.length > 0 && filterData.colors.length > 0) {
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
    <CustomView type="fullscreen">
      <CustomView type="body" style={{height:'100%'}}>
        {/* Search bar */}
        <CustomInput
          onChangeText={text => onSearch(text)}
          icon={faSearch}
          marginBottom={12}
          placeholder={lang[langPref].edSearch}
        />
        <CustomView type="itemRow" marignBottom={20}>
          {/* Button - Filter */}
          <CustomButton onPressed={onFilterPressed} flex={1}>
            <ItemRow justifyContent="flex-start">
              <FontAwesomeIcon
                color={themes[currentTheme].textColor}
                style={{marginRight: 4}}
                icon={faSliders}
              />
              <CustomText type="subTitle">
                {lang[langPref].text_filter}
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
                {sortText ? sortText : lang[langPref].text_sort}
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
                  ? lang[langPref].text_display_column
                  : lang[langPref].text_display_grid}
              </CustomText>
            </ItemRow>
          </CustomButton>
        </CustomView>

        {/* Flatlist */}
        {isColumn == false ? (
          // 2 column
          <FlatList
            key="@"
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 24,
            }}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={filteredList}
            keyExtractor={item => item.id}
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
            contentContainerStyle={{gap: 16, marginBottom: 24}}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            data={filteredList}
            keyExtractor={item => item.id}
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
              {lang[langPref].sort_name_asc}
            </CustomText>
          </CustomButton>
          <CustomButton onPressed={() => onSortOptionSelected('NAME_DESC')}>
            <CustomText type="subTitle" marginBottom={8}>
              {lang[langPref].sort_name_desc}
            </CustomText>
          </CustomButton>
          <CustomButton onPressed={() => onSortOptionSelected('PRICE_ASC')}>
            <CustomText type="subTitle" marginBottom={8}>
              {lang[langPref].sort_price_asc}
            </CustomText>
          </CustomButton>
          <CustomButton onPressed={() => onSortOptionSelected('PRICE_DESC')}>
            <CustomText type="subTitle" marginBottom={8}>
              {lang[langPref].sort_price_desc}
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
