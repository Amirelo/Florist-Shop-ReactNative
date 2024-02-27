// React and libs
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

// Models
import {CategoryModel} from '../../models';

// Components
import {CustomText, CustomImage, CustomButton} from '../atoms';

// User Preferences
import themes from '../../themes/themes';

interface Props {
  //marginTop?: number;
  //marginBottom?: number;
  category: CategoryModel;
  onPressed(name: string): void;
}

const ItemCategory = (props: Props) => {
  return (
    <CustomButton onPressed={() => props.onPressed(props.category.name)}>
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
