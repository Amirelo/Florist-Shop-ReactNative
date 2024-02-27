// React and libs
import React from 'react';
import {ViewStyle} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';

// Models
import {ProductModel} from '../../models';

// Components
import {
  CustomText,
  CustomImage,
  CustomButton,
  ItemRow,
  CustomView,
} from '../atoms';

// User Preferences
import themes from '../../themes/themes';
import lang from '../../language/lang';

// Utilities
import {priceFormat} from '../../utils/Utils';

interface Props {
  product: ProductModel;
  onPressed?(): void;
  marginBottom?: number;
  marginTop?: number;
  langPref: keyof typeof lang;
}

const ItemProduct = (props: Props) => {
  const currentThemes: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  return (
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
      <CustomView
        style={{alignSelf: 'baseline'}}
        type={'itemPadding'}
        backgroundColor={themes[currentThemes].tertiaryColor}>
        {/* Product Image */}
        <CustomImage
          type="item"
          resizeMode="cover"
          marginBottom={12}
          source={props.product.images[0]}
        />
        {/* Product Name */}
        <CustomText style={{maxWidth: 144}} type="title" maxLines={1}>
          {props.product.name}
        </CustomText>
        <ItemRow>
          {/* Product Price */}
          <CustomText
            color={themes[currentThemes].primaryColor}
            type="subTitle">
            {priceFormat(props.product.price, 'vn')}
          </CustomText>
          {/* Buy Icon */}
          <FontAwesomeIcon
            color={themes[currentThemes].primaryColor}
            icon={solid.faCartShopping}
          />
        </ItemRow>
      </CustomView>
    </CustomButton>
  );
};

export default ItemProduct;
