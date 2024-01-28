import {StyleSheet, View} from 'react-native';
import {PromocodeModel} from '../../models';
import {CustomImage, CustomText} from '../atoms';
import React from 'react';

interface Props {
  item: PromocodeModel;
}

const ItemPromocode = (props: Props) => {
    const [sale, setSale] = React.useState('');
    React.useEffect(()=>{
        const type =props.item.effect.slice(0,1)
        const amount = props.item.effect.slice(1, props.item.effect.length)
        const discount = type == '%' ? 'get ' + amount +'% off' : 'price decrease by ' + amount
        setSale(discount)
    },[])

  return (
    <View style={styles.view}>
      <CustomImage type="tabImage" source={props.item.image} marginRight={12} />
      <View>
        <CustomText type='title'>{props.item.title}</CustomText>
        <CustomText >{`All items ${sale}`}</CustomText>
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
