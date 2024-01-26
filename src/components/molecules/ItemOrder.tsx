import {StyleSheet, View} from 'react-native';
import {CustomText, ItemRow} from '../atoms';

interface Props {
  marginTop?: number;
  marginBottom?: number;
}

const ItemOrder = (props: Props) => {
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
      <CustomText>Price</CustomText>
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
});
