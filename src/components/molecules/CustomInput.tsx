import React from 'react';
import {KeyboardType, KeyboardTypeOptions, StyleSheet, TextInput, View} from 'react-native';
import themes from '../../themes/themes';
import {CustomButton, CustomText} from '../atoms';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

interface Props {
  placeholder?: string;
  hidden?: boolean;
  value?:string;
  onChangeText?(text: string): void;
  children?: string;
  marginTop?: number;
  marginBottom?: number;
  icon?: IconProp;
  keyboardType?: KeyboardType
}

const CustomInput = (props: Props) => {
  const [secure, setSecure] = React.useState(props.hidden);

  const onSecurePressed = () => {
    setSecure(!secure);
  };

  return (
    <View
      style={[
        {marginTop: props.marginTop, marginBottom: props.marginBottom},
        props.icon ? styles.view : null,
      ]}>
      {props.icon == null ? (
        <CustomText textTransform='capitalize' type="title" marginBottom={12}>
          {props.placeholder + ''}
        </CustomText>
      ) : (
        <FontAwesomeIcon style={styles.icon} size={18} icon={props.icon} />
      )}

      <TextInput
        keyboardType={props.keyboardType}
        secureTextEntry={secure}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        style={[props.icon ? styles.input : styles.viewUpdate]}>
        {props.children}
      </TextInput>
      {props.hidden ? (
        <CustomButton style={styles.iconEnd} onPressed={onSecurePressed}>
          <FontAwesomeIcon size={18} icon={secure ? faEye : faEyeSlash} />
        </CustomButton>
      ) : (
        <></>
      )}
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

  iconEnd: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 20,
  },
  input: {
    paddingStart: 38,
    width: '100%',
  },
});
