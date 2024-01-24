import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomImage, CustomText} from '../atoms';
import {QuantityCounter} from '.';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import {ProductModel} from '../../models';

interface Props {
  marginTop?: number;
  marginBottom?: number;
  item: ProductModel;
  total: number;
  setTotal:any;
}

const ItemCart = (props: Props) => {
  const [quantity, setQuantity] = React.useState(1);
  const [isAdd, setIsAdd] = React.useState(false);

    React.useEffect(() => {
        isAdd == true ?
        props.setTotal(props.total + (props.item.price * quantity) - (props.item.price * (quantity - 1))):
        props.setTotal(props.total + (props.item.price * quantity) - (props.item.price * (quantity + 1)))
    },[quantity])


  return (
    <View
      style={[
        styles.view,
        {marginTop: props.marginTop, marginBottom: props.marginBottom},
      ]}>
      <CustomImage
        type="cart"
        marginRight={8}
        source="https://images.pexels.com/photos/931179/pexels-photo-931179.jpeg"
      />
      <View style={styles.body}>
        <View style={[styles.row, {marginBottom: 8}]}>
          <CustomText type="title">{props.item.name}</CustomText>
          <FontAwesomeIcon size={16} icon={faEllipsisVertical} />
        </View>
        <View style={styles.row}>
          <CustomText type="subTitle">{`$${
            props.item.price * quantity
          }`}</CustomText>
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
