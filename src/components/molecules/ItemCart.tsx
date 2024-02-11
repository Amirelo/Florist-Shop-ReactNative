import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomImage, CustomText} from '../atoms';
import {QuantityCounter} from '.';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import {ProductModel} from '../../models';
import {priceFormat} from '../../utils/Utils';

interface Props {
  marginTop?: number;
  marginBottom?: number;
  item: ProductModel;
  quantity:number;
}

const ItemCart = (props: Props) => {
  const [quantity, setQuantity] = React.useState(1);
  const [isAdd, setIsAdd] = React.useState(false);
  console.log('ITEMCART:', props.item);

  React.useEffect(() => {
    setQuantity(props.quantity)
  },[])

  React.useEffect(()=>{
    props.quantity = quantity
  },[quantity])

  return (
    <View
      style={[
        styles.view,
        {marginTop: props.marginTop, marginBottom: props.marginBottom},
      ]}>
      <CustomImage type="cart" marginRight={8} source={props.item.images[0]} />
      <View style={styles.body}>
        <View style={[styles.row, {marginBottom: 8}]}>
          <CustomText type="title">{props.item.name}</CustomText>
          <FontAwesomeIcon size={16} icon={faEllipsisVertical} />
        </View>
        <View style={styles.row}>
          <CustomText type="subTitle">
            {priceFormat(props.item.price * quantity, 'en')}
          </CustomText>
          <QuantityCounter
            quantity={quantity}
            setQuantity={setQuantity}
            maxQuantity={props.item.quantity}
            setIsAdd={setIsAdd}
          />
        </View>
      </View>
    </View>
  );
};

export default ItemCart;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 7,
  },
  body: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
