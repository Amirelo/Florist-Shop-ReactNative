import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import themes from '../../themes/themes';
import {CustomText, CustomImage} from '../atoms';
import {CategoryModel} from '../../models';

interface Props {
  marginTop?: number;
  marginBottom?: number;
  category: CategoryModel;
}

const ItemCategory = (props: Props) => {
  return (
    <View
      style={
        [
          styles.view,
          {marginTop: props.marginTop, marginBottom: props.marginBottom},
        ] as ViewStyle
      }>
      <CustomImage type="category" source={props.category.image} />
      <CustomText color={themes['defaultTheme'].textSecondaryColor}>
        {props.category.name}
      </CustomText>
    </View>
  );
};

export default ItemCategory;

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'baseline',
  },
});
