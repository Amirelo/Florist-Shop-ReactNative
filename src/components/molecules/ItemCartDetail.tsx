import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {CustomText, CustomImage, CustomButton, ItemRow} from '../atoms';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import themes from '../../themes/themes';
import {CartModel, ProductModel} from '../../models';
import {priceFormat} from '../../utils/Utils';
import lang from '../../language/lang';
import { useSelector } from 'react-redux';

interface Props {
  product: ProductModel;
  cart?: CartModel;
  onPressed?(): void;
  marginBottom?: number;
  marginTop?: number;
  langPref: keyof typeof lang;
}

const ItemCartDetail = (props: Props) => {
  const currentTheme:keyof typeof themes = useSelector((store:any) => store.preference.theme)
  return (
    <CustomButton
      onPressed={props.onPressed}
      style={
        [
          styles.view,
          {
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            backgroundColor: themes[currentTheme].tertiaryColor
          },
        ] as ViewStyle
      }>
      <View>
        {/* Product Image */}
        <CustomImage
          type="item"
          resizeMode="cover"
          marginBottom={12}
          source={props.product.images[0]}
        />
        <View style={styles.body}>
          {/* Product Name */}
          <CustomText type="title">{props.product.name}</CustomText>
        </View>
        {/* Product Price */}
        <CustomText type="subTitle">
          {priceFormat(props.product.price, 'vn')}
        </CustomText>

        <ItemRow marginBottom={4}>
          <CustomText>Quantity:</CustomText>
          <CustomText>
            {props.cart ? props.cart?.quantity.toString() : ''}
          </CustomText>
        </ItemRow>
        <ItemRow marginBottom={4}>
          <CustomText>Total:</CustomText>
          <CustomText  color={themes[currentTheme].primaryColor}>
            {props.cart
              ? priceFormat(props.product.price * props.cart.quantity, 'vn')
              : '0'}
          </CustomText>
        </ItemRow>
        <View style={styles.body}></View>
      </View>
    </CustomButton>
  );
};

export default ItemCartDetail;

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
