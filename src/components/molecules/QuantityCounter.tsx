import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomText} from '../atoms';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

interface Props {
  quantity: number;
  setQuantity: any;
  setIsAdd?: any;
  onChanged?: any;
  maxQuantity: number;
}

const QuantityCounter = (props: Props) => {
  const onChangeQuantityPressed = (amount: number) => {
    props.quantity + amount > 0 &&
    props.quantity + amount <= props.maxQuantity ? (
      props.setQuantity(props.quantity + amount),
      props.onChanged(amount)
    ) : (
      <></>
    );
    
  };

  return (
    <View style={styles.view}>
      <CustomButton
        style={styles.button}
        onPressed={() => onChangeQuantityPressed(-1)}>
        <FontAwesomeIcon icon={faMinus} />
      </CustomButton>
      <View style={styles.text}>
        <CustomText type="subTitle">{props.quantity + ''}</CustomText>
      </View>
      <CustomButton
        style={styles.button}
        onPressed={() => onChangeQuantityPressed(1)}>
        <FontAwesomeIcon icon={faPlus} />
      </CustomButton>
    </View>
  );
};

export default QuantityCounter;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    backgroundColor: '#818A9820',
    alignItems: 'center',
    borderRadius: 7,
  },
  button: {
    width: 50,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: 'white',
    borderRadius: 7,
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
