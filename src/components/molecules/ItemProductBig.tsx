import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {CustomText, CustomImage, RatingStars, CustomButton} from '../atoms';
import {ProductModel} from '../../models';
import themes from '../../themes/themes';
import lang from '../../language/lang';
import { priceFormat } from '../../utils/Utils';

interface Props {
  product: ProductModel;
  onPressed?(): void;
  marginBottom?: number;
  marginTop?: number;
  langPref: keyof typeof lang;
}

const ItemProductBig = (props: Props) => {
  return (
    <CustomButton
      onPressed={props.onPressed}
      style={
        [
          styles.view,
          {marginTop: props.marginTop, marginBottom: props.marginBottom},
        ] as ViewStyle
      }>
      <View>
        {/* Product Image */}
        <CustomImage
          type="itemBig"
          marginBottom={12}
          source={props.product.images[0]}
        />
        <View style={styles.body}>
          {/* Product Name */}
          <CustomText
            maxLines={1}
            style={{maxWidth: '70%'}}
            type="subHeader"
            color={themes['defaultTheme'].primaryColor}>
            {props.product.name}
          </CustomText>
          {/* Rating Stars */}
          <RatingStars totalRating={props.product.totalRating} />
        </View>
        {/* Product Price */}
        <CustomText type="title">{priceFormat(props.product.price, 'en')}</CustomText>
      </View>
    </CustomButton>
  );
};

export default ItemProductBig;

const styles = StyleSheet.create({
  view: {
    padding: 12,
    backgroundColor: themes['defaultTheme'].tertiaryColor,
    borderRadius: 7,
    
  },
  rating: {
    flexDirection: 'row',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
