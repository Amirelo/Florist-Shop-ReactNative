// React and libs
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';

// Models
import {CartModel, ProductModel} from '../../models';

// Components
import {CustomText, CustomImage, CustomButton, ItemRow} from '../atoms';

// User Preferences
import themes from '../../themes/themes';
import lang from '../../language/lang';

// Utilities
import {priceFormat} from '../../utils/Utils';

interface Props {
  product: ProductModel;
  cart?: CartModel;
  onPressed?(): void;
  marginBottom?: number;
  marginTop?: number;
  langPref: keyof typeof lang;
}

const ItemCartDetail = (props: Props) => {
  // Get selected theme
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );

  return (
    <CustomButton
      onPressed={props.onPressed}
      style={
        [
          styles.view,
          {
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            backgroundColor: themes[currentTheme].tertiaryColor,
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
          <CustomText color={themes[currentTheme].primaryColor}>
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
