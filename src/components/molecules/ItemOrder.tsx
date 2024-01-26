import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomText, ItemRow} from '../atoms';
import themes from '../../themes/themes';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import OrderModel from '../../models/OrderModel';

interface Props {
  marginTop?: number;
  marginBottom?: number;
  item: OrderModel;
  onPressed?(): void;
}

const ItemOrder = (props: Props) => {
    

  return (
    <View
      style={[
        styles.view,
        {marginTop: props.marginTop, marginBottom: props.marginBottom},
      ]}>
      <ItemRow marginBottom={8}>
        <CustomText>{`ID: ${props.item.id.toString()}`}</CustomText>
        <CustomText>{props.item.orderDate}</CustomText>
      </ItemRow>

      <ItemRow marginBottom={8}>
        <CustomText>{`Number of items: ${props.item.amount}`}</CustomText>
        <CustomText>{`Status: ${props.item.status.toLowerCase()}`}</CustomText>
      </ItemRow>
      <View style={styles.divider} />
      <ItemRow marginBottom={12}>
        <CustomText>Price</CustomText>
        <CustomText>{`$${props.item.totalPrice}`}</CustomText>
      </ItemRow>
      <CustomButton onPressed={props.onPressed} style={styles.button}>
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
