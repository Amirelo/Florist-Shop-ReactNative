import {FlatList, View} from 'react-native';
import {CustomText, ItemRow} from '../../../components/atoms';
import {CustomInput} from '../../../components/molecules';
import React from 'react';
import { CategoryModel } from '../../../models';
import { getCategories } from '../MainService';

const ProductFilterScreen = () => {
  const [listCategories, setListCategories] = React.useState<Array<CategoryModel>>()


  const getCategory = async () => {
    const categories = await getCategories()
    setListCategories(categories)
  }

  React.useEffect(()=> {
    getCategory()
  },[])


  return (
    <View style={{paddingHorizontal: 16, paddingTop: 20}}>
      <CustomText type="title" marginBottom={10}>
        Price Range
      </CustomText>
      <View style={{borderRadius: 7, borderWidth: 1, padding: 12}}>
        <ItemRow>
        <CustomInput
          placeholder="Minimum Price"
          keyboardType="numeric"></CustomInput>
        <CustomInput
          placeholder="Maximum Price"
          keyboardType="numeric"></CustomInput>
          </ItemRow>
      </View>
      <CustomText type="title">Occasion</CustomText>
      <View style={{borderRadius: 7, borderWidth: 1, padding: 12}}>
      <FlatList
      data={listCategories}
      key={'#'}
      keyExtractor={item => item.id}
      renderItem={({item}) => <CustomText>{item.name}</CustomText>}/>

      </View>
      <CustomText type="title">Color</CustomText>
      <View style={{borderRadius: 7, borderWidth: 1, padding: 12}}></View>
    </View>
  );
};

export default ProductFilterScreen;
