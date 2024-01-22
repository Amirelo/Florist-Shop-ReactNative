import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import CustomImage from '../atoms/CustomImage';
import CategoryModel from '../models/CategoryModel';
import CustomText from '../atoms/CustomText';
import themes from '../../themes/themes';

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
      <CustomImage type="category" source={props.category.link} />
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
