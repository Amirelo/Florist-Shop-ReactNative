import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomText, Divider, ItemRow} from '../atoms';
import {AddressModel} from '../../models';
import themes from '../../themes/themes';

interface Props {
  item: AddressModel;
  onPressed?(): void; 
}

const ItemAddress = (props: Props) => {
  return (
    <View style={styles.view}>
      <CustomText type={'subTitle'} marginBottom={12}>
        {props.item.streetNumber +
          ' ' +
          props.item.street +
          ', ' +
          props.item.ward +
          ', ' +
          props.item.district +
          ', ' +
          props.item.city}
      </CustomText>
      <Divider/>

      <ItemRow marginBottom={8}>
        <CustomText>Street Number</CustomText>
        <CustomText>{props.item.streetNumber}</CustomText>
      </ItemRow>
      <Divider/>
      <ItemRow marginBottom={8}>
        <CustomText>Street</CustomText>
        <CustomText>{props.item.street}</CustomText>
      </ItemRow>
      <Divider/>
      <ItemRow marginBottom={8}>
        <CustomText>Ward</CustomText>
        <CustomText>{props.item.ward}</CustomText>
      </ItemRow>
      <Divider/>
      <ItemRow marginBottom={8}>
        <CustomText>City</CustomText>
        <CustomText>{props.item.city}</CustomText>
      </ItemRow>
      <CustomButton onPressed={props.onPressed} style={styles.button}>
        <CustomText color={'white'} type='subTitle'>Edit</CustomText>
      </CustomButton>
    </View>
  );
};

export default ItemAddress;

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 7,
  },
  button: {
    alignSelf:'flex-end',
    backgroundColor: themes['defaultTheme'].primaryColor,
    paddingVertical: 8,
    paddingHorizontal:16,
    borderRadius: 7
  },
});
