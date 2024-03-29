// React and libs
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';

// Components
import {CustomButton, CustomText} from '../atoms';

// User Preferences
import themes from '../../themes/themes';

interface Props {
  quantity: number;
  setQuantity?: any;
  onChanged?: any;
  maxQuantity: number;
  minQuantity?: number;
}

const QuantityCounter = (props: Props) => {
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );

  const onChangeQuantityPressed = (amount: number) => {
    props.quantity + amount > (props.minQuantity ? props.minQuantity : 0) &&
    props.quantity + amount <= props.maxQuantity ? (
      (props.setQuantity ? props.setQuantity(props.quantity + amount) : '',
      props.onChanged ? props.onChanged(amount) : '')
    ) : (
      <></>
    );
  };

  return (
    <View
      style={[
        styles.view,
        {backgroundColor: themes[currentTheme].secondaryColor},
      ]}>
      <CustomButton
        style={styles.button}
        onPressed={() => onChangeQuantityPressed(-1)}>
        <FontAwesomeIcon icon={faMinus} />
      </CustomButton>
      <View
        style={[
          styles.text,
          {backgroundColor: themes[currentTheme].tertiaryColor},
        ]}>
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
    borderRadius: 7,
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
