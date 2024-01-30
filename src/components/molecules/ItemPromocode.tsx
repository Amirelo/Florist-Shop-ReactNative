import {StyleSheet, View} from 'react-native';
import {PromocodeModel} from '../../models';
import {CustomImage, CustomText} from '../atoms';
import React from 'react';

interface Props {
  item: PromocodeModel;
}

const ItemPromocode = (props: Props) => {
    const [sale, setSale] = React.useState('');
    const [status, setStatus] = React.useState(props.item.status ? 'Active' : 'Expired')

    React.useEffect(()=>{
        const discount = props.item.effect == '%' ? 'get ' + props.item.amount +'% off' : 'price decrease by ' + props.item.amount
        setSale(discount)
    },[])

  return (
    <View style={styles.view}>
      <CustomImage type="tabImage" source={props.item.image} marginRight={12} />
      <View>
        <CustomText type='title'>{props.item.title}</CustomText>
        <CustomText >{`All items ${sale}`}</CustomText>
        <CustomText color={status == 'Active' ?'green' : 'red'}>{status}</CustomText>
      </View>
    </View>
  );
};

export default ItemPromocode;

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 12,
  },
});
