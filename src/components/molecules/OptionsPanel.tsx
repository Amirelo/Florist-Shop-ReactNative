import {ScrollView, StyleSheet, View, ViewStyle} from 'react-native';
import {CustomButton, CustomText, Divider} from '../atoms';
import React from 'react';
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';
import themes from '../../themes/themes';
import { useSelector } from 'react-redux';

interface Props {
  children: any;
  title: string;
  setActive: any;
  maxHeight?: ViewStyle['maxHeight'];
}

const OptionsPanel = (props: Props) => {
  const currentTheme:keyof typeof themes = useSelector((store:any) => store.preference.theme)

  const onBackgroundPressed = () => {
    props.setActive(false);
  };

  return (
    <View style={styles.view}>
      <CustomButton
        onPressed={onBackgroundPressed}
        style={[styles.back,{backgroundColor: themes[currentTheme].textColor+'20',}]}></CustomButton>
      <View style={[styles.main, {height: props.maxHeight, backgroundColor: themes[currentTheme].tertiaryColor,}]}>
        <CustomText type="title" marginBottom={20}>
          {props.title}
        </CustomText>
        <Divider width={'90%'} marginBottom={20} />
        <View style={{width: '90%'}}>
          <ScrollView scrollEnabled={true} contentContainerStyle={{alignItems:'center', gap:16}}>{props.children}</ScrollView>
        </View>
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
    paddingBottom: 32,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    
  },
  back: {
    width: '100%',
    height: '100%',
    
    position: 'absolute',
  },
});
