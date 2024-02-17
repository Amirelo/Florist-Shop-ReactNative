import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import themes from '../../themes/themes';
import {CustomText, CustomImage, CustomButton} from '../atoms';
import {CategoryModel} from '../../models';

interface Props {
  //marginTop?: number;
  //marginBottom?: number;
  category: CategoryModel;
  onPressed?(name:string): void;
}

const ItemCategory = (props: Props) => {
  return (
    <CustomButton>
      <View
        style={
          [
            styles.view,
            //{marginTop: props.marginTop, marginBottom: props.marginBottom},
          ] as ViewStyle
        }>
        <CustomImage type="category" source={props.category.image} />
        <CustomText color={themes['defaultTheme'].textSecondaryColor}>
          {props.category.name}
        </CustomText>
      </View>
    </CustomButton>
  );
};

export default ItemCategory;

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    alignSelf: 'baseline',
  },
});
