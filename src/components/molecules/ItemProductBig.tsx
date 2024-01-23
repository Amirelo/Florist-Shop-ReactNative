import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {CustomText, CustomImage} from '../atoms';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as regular from '@fortawesome/free-regular-svg-icons';
import * as solid from '@fortawesome/free-solid-svg-icons';
import themes from '../../themes/themes';
import {ProductModel} from '../models';

interface Props {
  product: ProductModel;
  marginBottom?: number;
  marginTop?: number;
}

const ItemProductBig = (props: Props) => {
  return (
    <View
      style={
        [
          styles.view,
          {marginTop: props.marginTop, marginBottom: props.marginBottom},
        ] as ViewStyle
      }>
      <View>
        <CustomImage
          type="match_parent"
          marginBottom={12}
          source={props.product.links[0]}
        />
        <View style={styles.body}>
          <CustomText
            type="subHeader"
            color={themes['defaultTheme'].primaryColor}>
            {props.product.name}
          </CustomText>
          <View style={styles.rating}>
            <FontAwesomeIcon
              size={18}
              color={themes['defaultTheme'].warnColor}
              icon={
                props.product.totalRating >= 1 ? solid.faStar : regular.faStar
              }
            />
            <FontAwesomeIcon
              size={18}
              color={themes['defaultTheme'].warnColor}
              icon={props.product.totalRating >= 2 ? solid.faStar : regular.faStar}
            />
            <FontAwesomeIcon
              size={18}
              color={themes['defaultTheme'].warnColor}
              icon={props.product.totalRating >= 3 ? solid.faStar : regular.faStar}
            />
            <FontAwesomeIcon
              size={18}
              color={themes['defaultTheme'].warnColor}
              icon={props.product.totalRating >= 4 ? solid.faStar : regular.faStar}
            />
            <FontAwesomeIcon
              size={18}
              color={themes['defaultTheme'].warnColor}
              icon={props.product.totalRating == 5 ? solid.faStar : regular.faStar}
            />
          </View>
        </View>
        <CustomText type="title">{`$${props.product.price}`}</CustomText>
      </View>
    </View>
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
