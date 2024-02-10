import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {CustomText, CustomImage, RatingStars, CustomButton} from '../atoms';
import themes from '../../themes/themes';
import {ProductModel} from '../../models';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import lang from '../../language/lang';
import { priceFormat } from '../../utils/Utils';

interface Props {
  product: ProductModel;
  onPressed?(): void;
  marginBottom?: number;
  marginTop?: number;
  langPref: keyof typeof lang;
}

const ItemProductLong = (props: Props) => {
  return (
    <CustomButton
      onPressed={props.onPressed}
      style={
        [
          styles.view,
          {marginTop: props.marginTop, marginBottom: props.marginBottom},
        ] as ViewStyle
      }>
      <View style={styles.body}>
        <CustomImage
          type="itemProductLong"
          marginRight={12}
          source={props.product.images[0]}
        />
        <View style={{flex:1}}>
          <CustomText
            type="subHeader"
            color={themes['defaultTheme'].primaryColor}>
            {props.product.name}
          </CustomText>
          <CustomText type='subTitle'>{props.product.description}</CustomText>
          <View style={styles.rating}>
          <CustomText type="title">{priceFormat(props.product.price, props.langPref)}</CustomText>
          <RatingStars totalRating={props.product.totalRating} />
          </View>
          <FontAwesomeIcon
            style={{alignSelf:'flex-end'}}
            size={18}
            color={themes['defaultTheme'].primaryColor}
            icon={faShoppingCart}
          />
        </View>
      </View>
    </CustomButton>
  );
};

export default ItemProductLong;

const styles = StyleSheet.create({
  view: {
    padding: 12,
    backgroundColor: themes['defaultTheme'].tertiaryColor,
  },
  rating: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:8,
  },
  body: {
    flexDirection: 'row',
  },
});
