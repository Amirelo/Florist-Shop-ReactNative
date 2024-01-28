import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import themes from '../../themes/themes';
import {CustomText} from '../atoms';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

interface Props {
  placeholder?: string;
  onChange?(): void;
  children?: string;
  marginTop?: number;
  marginBottom?: number;
  icon?: IconProp;
}

const CustomInput = (props: Props) => {
  return (
    <View
      style={[
        {marginTop: props.marginTop, marginBottom: props.marginBottom},
        props.icon ? styles.view : null,
      ]}>
      {props.icon == null ? (
        <CustomText type="title" marginBottom={12}>
          {props.placeholder + ''}
        </CustomText>
      ) : (
        <FontAwesomeIcon style={styles.icon} size={18} icon={props.icon!} />
      )}

      <TextInput
        placeholder={props.placeholder}
        onChange={props.onChange}
        style={[props.icon ? styles.input : styles.viewUpdate]}
      >{props.children}</TextInput>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  viewUpdate: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: themes['defaultTheme'].textSecondaryColor,
    backgroundColor: 'white',
    paddingStart: 20,
  },
  view: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: themes['defaultTheme'].textSecondaryColor,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: 20,
    position: 'absolute',
  },
  input: {
    paddingStart: 38,
    width: '100%',
  },
});
