import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {CustomText, CustomImage, RatingStars, CustomButton, CustomView} from '../atoms';
import themes from '../../themes/themes';
import {ProductModel} from '../../models';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import lang from '../../language/lang';
import {priceFormat} from '../../utils/Utils';
import {useSelector} from 'react-redux';

interface Props {
  product: ProductModel;
  onPressed?(): void;
  marginBottom?: number;
  marginTop?: number;
  langPref: keyof typeof lang;
}

const ItemProductLong = (props: Props) => {
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  return (
    <CustomView type='itemPadding' backgroundColor={themes[currentTheme].tertiaryColor}>
    <CustomButton
      onPressed={props.onPressed}
      style={
        [
          {
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
          },
        ] as ViewStyle
      }>
      <View style={styles.body}>
        {/* Product Image */}
        <CustomImage
          type="itemProductLong"
          marginRight={12}
          source={props.product.images[0]}
        />
        <View style={{flex: 1}}>
          {/* Product Name */}
          <CustomText
            type="bigTitle"
            maxLines={1}
            color={themes[currentTheme].primaryColor}>
            {props.product.name}
          </CustomText>
          {/* Produt Description */}
          <CustomText type="subTitle" maxLines={2}>
            {props.product.description}
          </CustomText>
          <View style={styles.rating}>
            {/* Product Price */}
            <CustomText
              type="title"
              color={themes[currentTheme].primaryColor}>
              {priceFormat(props.product.price, 'en')}
            </CustomText>
            {/* Rating Stars */}
            <RatingStars totalRating={props.product.totalRating} />
          </View>
          {/* Buy Icon */}
          <FontAwesomeIcon
            style={{alignSelf: 'flex-end'}}
            size={18}
            color={themes[currentTheme].primaryColor}
            icon={faShoppingCart}
          />
        </View>
      </View>
    </CustomButton>
    </CustomView>
  );
};

export default ItemProductLong;

const styles = StyleSheet.create({
  view: {
    padding: 12,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  body: {
    flexDirection: 'row',
  },
});
