import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomText, ItemRow} from '../atoms';
import themes from '../../themes/themes';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface Props {
  marginTop?: number;
  marginBottom?: number;
}

const ItemOrder = (props: Props) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const onDetailPressed = () => {
        navigation.navigate('OrderDetail');
    }

  return (
    <View
      style={[
        styles.view,
        {marginTop: props.marginTop, marginBottom: props.marginBottom},
      ]}>
      <ItemRow marginBottom={8}>
        <CustomText>Id</CustomText>
        <CustomText>Order date</CustomText>
      </ItemRow>

      <ItemRow marginBottom={8}>
        <CustomText>Number of items</CustomText>
        <CustomText>Status</CustomText>
      </ItemRow>
      <View style={styles.divider} />
      <ItemRow marginBottom={12}>
        <CustomText>Price</CustomText>
        <CustomText>$90</CustomText>
      </ItemRow>
      <CustomButton onPressed={onDetailPressed} style={styles.button}>
        <CustomText type='subTitle' color={'white'}>See details</CustomText>
      </CustomButton>
    </View>
  );
};

export default ItemOrder;

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'gray',
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 16,
  },
  button:{
    padding:12,
    borderRadius: 7,
    alignSelf:'flex-end',
    backgroundColor: themes['defaultTheme'].primaryColor,
  }
});
