import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomText, Divider} from '../atoms';
import React from 'react';

interface Props {
  children: any;
  title: string;
  setActive:any;
}

const OptionsPanel = (props: Props) => {
    const onBackgroundPressed = () => {
        props.setActive(false)
    }

  return (
    <View style={styles.view}>
      <CustomButton onPressed={onBackgroundPressed} style={styles.back}></CustomButton>
      <View style={styles.main}>
        <CustomText type="title" marginBottom={20}>
          {props.title}
        </CustomText>
        <Divider width={'90%'} marginBottom={20}/>
        {props.children}
      </View>
    </View>
  );
};

export default OptionsPanel;

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  main: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  back: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000020',
    position: 'absolute',
  },
});
