import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomImage, CustomText} from '../atoms';
import {QuantityCounter} from '.';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import {ProductModel} from '../../models';
import {priceFormat} from '../../utils/Utils';
import themes from '../../themes/themes';
import { useSelector } from 'react-redux';

interface Props {
  marginTop?: number;
  marginBottom?: number;
  onQuantityChanged?: any;
  onEllipsesPressed?: any;
  item: ProductModel;
  quantity:number;
}

const ItemCart = (props: Props) => {
  const [quantity, setQuantity] = React.useState(1);

  const currentTheme:keyof typeof themes = useSelector((store:any) => store.preference.theme)

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
        {marginTop: props.marginTop, marginBottom: props.marginBottom,backgroundColor: themes[currentTheme].tertiaryColor},
      ]}>
      <CustomImage type="cart" marginRight={8} source={props.item.images[0]} />
      <View style={styles.body}>
        <View style={[styles.row, {marginBottom: 8}]}>
          <CustomText type="title">{props.item.name}</CustomText>
          <CustomButton onPressed={props.onEllipsesPressed}>
          <FontAwesomeIcon size={16} icon={faEllipsisVertical} />
          </CustomButton>
        </View>
        <View style={styles.row}>
          <CustomText type="subTitle">
            {priceFormat(props.item.price * quantity, 'vn')}
          </CustomText>
          <QuantityCounter
            quantity={quantity}
            setQuantity={setQuantity}
            maxQuantity={props.item.quantity}
            onChanged={(amount:number)=>{props.onQuantityChanged(amount)}}
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
