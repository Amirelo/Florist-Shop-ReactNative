import {View} from 'react-native';
import { CustomText } from '../../../components/atoms';

const ProductFilterScreen = () => {
  return (
  <View>
    <CustomText type='title'>Price Range</CustomText>
    <CustomText type='title'>Occasion</CustomText>
    <CustomText type='title'>Color</CustomText>
  </View>);
};

export default ProductFilterScreen;
