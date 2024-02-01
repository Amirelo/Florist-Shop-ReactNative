import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CustomText, CustomImage, RatingStars, CustomButton} from '../atoms';
import {ProductModel} from '../../models';
import themes from '../../themes/themes';

interface Props {
  product: ProductModel;
  onPressed?(): void;
  marginBottom?: number;
  marginTop?: number;
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
        <CustomImage
          type="itemBig"
          marginBottom={12}
          source={props.product.images[0]}
        />
        <View style={styles.body}>
          <CustomText
            type="subHeader"
            color={themes['defaultTheme'].primaryColor}>
            {props.product.name}
          </CustomText>
          <RatingStars totalRating={props.product.totalRating} />
        </View>
        <CustomText type="title">{`$${props.product.price}`}</CustomText>
      </View>
    </CustomButton>
  );
};

export default ItemProductBig;

const styles = StyleSheet.create({
  view: {
    alignSelf: 'baseline',
    padding: 12,
    backgroundColor: themes['defaultTheme'].tertiaryColor,
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
