import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {CustomText, CustomImage, CustomButton} from '../atoms';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import themes from '../../themes/themes';
import {ProductModel} from '../../models';
import {useNavigation} from '@react-navigation/native';

interface Props {
  product: ProductModel;
  marginBottom?: number;
  marginTop?: number;
}

const ItemProduct = (props: Props) => {
  const navigation = useNavigation();
  const onItemPressed = () => {
    navigation.navigate('ProductDetail' as never);
  };
  return (
    <CustomButton
      onPressed={onItemPressed}
      style={
        [
          styles.view,
          {
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
          },
        ] as ViewStyle
      }>
      <View>
        <CustomImage
          type="item"
          resizeMode='cover'
          marginBottom={12}
          source={props.product.links[0]}
        />
        <View style={styles.body}>
          <CustomText type="title">{props.product.name}</CustomText>
        </View>
        <View style={styles.body}>
          <CustomText
            color={themes['defaultTheme'].primaryColor}
            type="subTitle">{`$${props.product.price}`}</CustomText>
          <FontAwesomeIcon
            color={themes['defaultTheme'].primaryColor}
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
    backgroundColor: themes['defaultTheme'].tertiaryColor,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
