import React from 'react';
import {ColorValue, StyleSheet, View} from 'react-native';
import {CustomText} from '../atoms';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import themes from '../../themes/themes';

interface Props {
  children: string;
  color?: ColorValue;
  quantity?: number;
  marginTop?: number;
  marginBottom?: number;
}

const ItemAccount = (props: Props) => {
  const [quantity, setQuantity] = React.useState(
    props.quantity ? props.quantity : '',
  );
  const subText = props.children.includes('Order')
    ? 'orders in progress'
    : props.children.includes('Address')
    ? 'address(es)'
    : props.children.includes('Promocodes')
    ? 'available'
    : props.children.includes('Password')
    ? 'Change your password'
    : 'Logout of you account';
  return (
    <View
      style={[
        styles.view,
        {
          marginTop: props.marginTop,
          marginBottom: props.marginBottom ? props.marginBottom : 12,
        },
      ]}>
      <View style={styles.body}>
        <CustomText color={props.color} type="title" marginBottom={8}>
          {props.children}
        </CustomText>
        <CustomText color={themes['defaultTheme'].textSecondaryColor}>
          {quantity + subText}
        </CustomText>
      </View>
      <FontAwesomeIcon icon={faChevronRight} />
    </View>
  );
};

export default ItemAccount;

const styles = StyleSheet.create({
  view: {
    height: 72,
    borderRadius: 7,
    padding: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {},
  icon: {
    marginRight: 18,
  },
});
