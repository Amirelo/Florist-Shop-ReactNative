import {FlatList, View} from 'react-native';
import {CustomText, CustomView, ItemRow} from '../../../components/atoms';
import {CustomInput, ItemPick} from '../../../components/molecules';
import React from 'react';
import {CategoryModel} from '../../../models';
import {getCategories} from '../MainService';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TextButton} from '../../../components/molecules/buttons';
import themes from '../../../themes/themes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NAVIGATION_BOTTOM_TAB_EXPLORE} from '../../../constants/AppConstants';
import {useSelector} from 'react-redux';
import lang from '../../../language/lang';

const ProductFilterScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();

  // Fields
  const [minPrice, setMinPrice] = React.useState('0');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [listCategories, setListCategories] = React.useState<
    Array<CategoryModel>
  >([]);
  const [selectedCategories, setSelectedCategories] = React.useState<
    Array<string>
  >([]);
  const [selectedColors, setSelectedColors] = React.useState<Array<string>>([]);
  const listFlowerColors = ['White', 'Red', 'Blue', 'Yellow', 'Purple', 'Pink'];
  const [clearCkb, setCleaCkb] = React.useState(false);

  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Get categories from server
  const getCategory = async () => {
    const categories = await getCategories();
    setListCategories(categories);
  };

  // Add category to selected list
  const onCategoryItemPressed = (title: string, status: boolean) => {
    console.log('Category Item Pressed:', title, status);
    if (selectedCategories.includes(title)) {
      if (!status) {
        const listAfter: Array<string> = selectedCategories.filter(
          item => item != title,
        );
        console.log(listAfter);
        setSelectedCategories(listAfter);
      }
    } else {
      if (status) {
        setSelectedCategories(prev => [...prev, title]);
      }
    }
  };

  // Add color to selected list
  const onColorItemPressed = (title: string, status: boolean) => {
    console.log('Category Item Pressed:', title, status);
    if (selectedColors.includes(title)) {
      if (!status) {
        const listAfter: Array<string> = selectedColors.filter(
          item => item != title,
        );
        console.log(listAfter);
        setSelectedColors(listAfter);
      }
    } else {
      if (status) {
        setSelectedColors(prev => [...prev, title]);
      }
    }
  };

  // Pass data back to ExploreScreen
  const onApplyPressed = () => {
    var min = 0;
    var max = 1000000;
    if (Number(minPrice) > 0) {
      min = Number(minPrice);
    }
    if (maxPrice != '') {
      max = Number(maxPrice);
    }

    navigation.navigate(NAVIGATION_BOTTOM_TAB_EXPLORE, {
      filter: {
        minPrice: min,
        maxPrice: max,
        categories: selectedCategories,
        colors: selectedColors,
      },
    });
  };

  // Clear fields on pressed
  const onClearPressed = () => {
    setMinPrice('0');
    setMaxPrice('');
    setSelectedCategories([]);
    setSelectedColors([]);
    setCleaCkb(prev => !prev);
  };

  React.useEffect(() => {
    console.log('Selected categories: ', selectedCategories);
    console.log('Selected colors: ', selectedColors);
  }, [selectedCategories, selectedColors]);

  React.useEffect(() => {
    getCategory();
  }, []);

  return (
    <CustomView type="fullscreen">
      <CustomView type="body">
        {/* Title - Price */}
        <CustomText type="title" marginBottom={10}>
          {lang[langPref].text_price_range}
        </CustomText>
        <View
          style={{
            borderRadius: 7,
            borderWidth: 1,
            borderColor: themes[currentTheme].textSecondaryColor,
            padding: 12,
            marginBottom: 20,
          }}>
          <ItemRow>
            {/* Min Price */}
            <CustomInput
              flex={1}
              value={minPrice}
              onChangeText={setMinPrice}
              placeholder={lang[langPref].text_price_min}
              keyboardType="numeric"></CustomInput>
              {/* Max Price */}
            <CustomInput
              flex={1}
              value={maxPrice}
              onChangeText={setMaxPrice}
              placeholder={lang[langPref].text_price_max}
              keyboardType="numeric"></CustomInput>
          </ItemRow>
        </View>
        {/* Title - Occasions */}
        <CustomText type="title" marginBottom={10}>
          {lang[langPref].text_occasion}
        </CustomText>
        <View
          style={{
            borderRadius: 7,
            borderWidth: 1,
            borderColor: themes[currentTheme].textSecondaryColor,
            padding: 12,
            marginBottom: 20,
          }}>
            {/* Occasion list */}
          <FlatList
            columnWrapperStyle={{marginBottom: 8}}
            numColumns={3}
            data={listCategories}
            key={'#'}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ItemPick
                isClear={clearCkb}
                onPressed={(title, status) =>
                  onCategoryItemPressed(title, status)
                }>
                {item.name}
              </ItemPick>
            )}
          />
        </View>
        <CustomText type="title" marginBottom={10}>
          {lang[langPref].text_color}
        </CustomText>
        <View
          style={{
            borderRadius: 7,
            borderWidth: 1,
            borderColor: themes[currentTheme].textSecondaryColor,
            padding: 12,
            marginBottom: 20,
          }}>
          {/* Flower color */}
          <FlatList
            columnWrapperStyle={{marginBottom: 8}}
            numColumns={3}
            data={listFlowerColors}
            key={'#'}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <ItemPick
                isClear={clearCkb}
                onPressed={(title, status) =>
                  onColorItemPressed(title, status)
                }>
                {item}
              </ItemPick>
            )}
          />
        </View>
        <TextButton type="primary" marginBottom={20} onPressed={onApplyPressed}>
          {lang[langPref].buttonApply}
        </TextButton>
        <TextButton
          type="primary"
          backgroundColor={themes['defaultTheme'].warnColor}
          onPressed={onClearPressed}>
          {lang[langPref].buttonClear}
        </TextButton>
      </CustomView>
    </CustomView>
  );
};

export default ProductFilterScreen;
