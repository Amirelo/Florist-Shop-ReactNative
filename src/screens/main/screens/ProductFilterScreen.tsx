import {FlatList, View} from 'react-native';
import {CustomText, ItemRow} from '../../../components/atoms';
import {CustomInput, ItemPick} from '../../../components/molecules';
import React from 'react';
import {CategoryModel} from '../../../models';
import {getCategories} from '../MainService';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TextButton} from '../../../components/molecules/buttons';
import themes from '../../../themes/themes';
import {NavigationProp, useNavigation} from '@react-navigation/native';

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

    navigation.navigate('Explore', {
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
    <View style={{paddingHorizontal: 16, paddingTop: 20}}>
      <CustomText type="title" marginBottom={10}>
        Price Range
      </CustomText>
      <View
        style={{
          borderRadius: 7,
          borderWidth: 1,
          padding: 12,
          marginBottom: 20,
        }}>
        <ItemRow>
          <CustomInput
            value={minPrice}
            onChangeText={setMinPrice}
            placeholder="Minimum Price"
            keyboardType="numeric"></CustomInput>
          <CustomInput
            value={maxPrice}
            onChangeText={setMaxPrice}
            placeholder="Maximum Price"
            keyboardType="numeric"></CustomInput>
        </ItemRow>
      </View>
      <CustomText type="title" marginBottom={10}>
        Occasion
      </CustomText>
      <View
        style={{
          borderRadius: 7,
          borderWidth: 1,
          padding: 12,
          marginBottom: 20,
        }}>
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
        Color
      </CustomText>
      <View
        style={{
          borderRadius: 7,
          borderWidth: 1,
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
              onPressed={(title, status) => onColorItemPressed(title, status)}>
              {item}
            </ItemPick>
          )}
        />
      </View>
      <TextButton type="primary" marginBottom={20} onPressed={onApplyPressed}>
        Apply
      </TextButton>
      <TextButton
        type="primary"
        backgroundColor={themes['defaultTheme'].warnColor}
        onPressed={onClearPressed}>
        Clear
      </TextButton>
    </View>
  );
};

export default ProductFilterScreen;
