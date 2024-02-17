import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {CustomText, CustomImage, CustomButton} from '../atoms';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import themes from '../../themes/themes';
import {ProductModel} from '../../models';
import { priceFormat } from '../../utils/Utils';
import lang from '../../language/lang';
import { useSelector } from 'react-redux';

interface Props {
  product: ProductModel;
  onPressed?(): void;
  marginBottom?: number;
  marginTop?: number;
  langPref: keyof typeof lang;
}

const ItemProduct = (props: Props) => {
  const currentThemes: keyof typeof themes = useSelector((store:any) => store.preference.theme)
  return (
    <CustomButton
      onPressed={props.onPressed}
      style={
        [
          styles.view,
          {
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            backgroundColor: themes[currentThemes].tertiaryColor,
          },
        ] as ViewStyle
      }>
      <View>
        {/* Product Image */}
        <CustomImage
          type="item"
          resizeMode='cover'
          marginBottom={12}
          source={props.product.images[0]}
        />
        <View style={styles.body}>
          {/* Product Name */}
          <CustomText type="title">{props.product.name}</CustomText>
        </View>
        <View style={styles.body}>
          {/* Product Price */}
          <CustomText
            color={themes[currentThemes].primaryColor}
            type="subTitle">{priceFormat(props.product.price, 'vn')}</CustomText>
            {/* Buy Icon */}
          <FontAwesomeIcon
            color={themes[currentThemes].primaryColor}
            icon={solid.faCartShopping}
          />
        </View>
      </View>
    </CustomButton>
  );
};

export default ItemProduct;

const styles = StyleSheet.create({
  view: {
    alignSelf: 'baseline',
    padding: 12,
    borderRadius: 14,
    
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
