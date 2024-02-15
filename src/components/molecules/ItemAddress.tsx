import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomText, Divider, ItemRow} from '../atoms';
import {AddressModel} from '../../models';
import themes from '../../themes/themes';
import {TextButton} from './buttons';
import {addressFormat} from '../../utils/Utils';

interface Props {
  item: AddressModel;
  onEditPressed?(): void;
  onDeletePressed?(): void;
}

const ItemAddress = (props: Props) => {
  return (
    <View style={styles.view}>
      <CustomText type={'subTitle'} marginBottom={12} fontWeight="bold">
        {addressFormat(props.item)}
      </CustomText>
      <Divider marginBottom={8} />

      <ItemRow marginBottom={8}>
        <CustomText type='subTitle'>Street Number</CustomText>
        <CustomText>{props.item.streetNumber + ''}</CustomText>
      </ItemRow>
      <Divider marginBottom={8} />
      <ItemRow marginBottom={8}>
        <CustomText type='subTitle'>Street</CustomText>
        <CustomText>{props.item.street + ''}</CustomText>
      </ItemRow>
      <Divider marginBottom={8} />
      <ItemRow marginBottom={8}>
        <CustomText type='subTitle'>Ward</CustomText>
        <CustomText>{props.item.ward + ''}</CustomText>
      </ItemRow>
      <Divider marginBottom={8} />
      <ItemRow marginBottom={12}>
        <CustomText type='subTitle'>City</CustomText>
        <CustomText>{props.item.city + ''}</CustomText>
      </ItemRow>
      <ItemRow marginBottom={4}>
        <TextButton
          alignSelf="baseline"
          type="primary"
          backgroundColor={'red'}
          onPressed={props.onDeletePressed}>
          Delete
        </TextButton>
        <TextButton
          alignSelf="baseline"
          type="primary"
          onPressed={props.onEditPressed}>
          Edit
        </TextButton>
      </ItemRow>
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
    alignSelf: 'flex-end',
    backgroundColor: themes['defaultTheme'].primaryColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 7,
  },
});
