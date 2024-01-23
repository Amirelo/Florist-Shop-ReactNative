import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomText} from '../atoms';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

const QuantityCounter = () => {
  return (
    <View style={styles.view}>
      <CustomButton style={styles.button}>
        <FontAwesomeIcon icon={faMinus} />
      </CustomButton>
      <View style={styles.text}>
        <CustomText type="subTitle">2</CustomText>
      </View>
      <CustomButton style={styles.button}>
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
