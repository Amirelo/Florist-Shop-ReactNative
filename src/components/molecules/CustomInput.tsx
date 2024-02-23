import React from 'react';
import {
  FlexStyle,
  KeyboardType,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import themes from '../../themes/themes';
import {CustomButton, CustomText} from '../atoms';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';

interface Props {
  placeholder?: string;
  hidden?: boolean;
  value?: string;
  onChangeText?(text: string): void;
  children?: string;
  marginTop?: number;
  marginBottom?: number;
  icon?: IconProp;
  keyboardType?: KeyboardType;
  flex?: number;
  multiLine?: boolean;
  width?: FlexStyle['width'];
  hideTitle?: boolean;
}

const CustomInput = (props: Props) => {
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const [secure, setSecure] = React.useState(props.hidden);

  const onSecurePressed = () => {
    setSecure(!secure);
  };

  return (
    <View
      style={[
        {
          marginTop: props.marginTop,
          marginBottom: props.marginBottom,
          borderColor: props.icon
            ? themes[currentTheme].textSecondaryColor
            : '',
          backgroundColor: props.icon ? themes[currentTheme].tertiaryColor : '',
          flex: props.flex,
          width: props.width,
        },
        props.icon ? styles.view : null,
      ]}>
      {props.hideTitle ? (
        <></>
      ) : props.icon == null ? (
        <CustomText textTransform="capitalize" type="title" marginBottom={12}>
          {props.placeholder + ''}
        </CustomText>
      ) : (
        <FontAwesomeIcon
          color={themes[currentTheme].textColor}
          style={styles.icon}
          size={18}
          icon={props.icon}
        />
      )}

      <TextInput
        multiline={props.multiLine}
        keyboardType={props.keyboardType}
        secureTextEntry={secure}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholderTextColor={themes[currentTheme].textSecondaryColor}
        style={[
          props.icon
            ? styles.input
            : [
                styles.viewUpdate,
                {
                  borderColor: themes[currentTheme].textSecondaryColor,
                  backgroundColor: themes[currentTheme].tertiaryColor,
                },
              ],
          {color: themes[currentTheme].textColor},
        ]}>
        {props.children}
      </TextInput>
      {props.hidden ? (
        <CustomButton style={styles.iconEnd} onPressed={onSecurePressed}>
          <FontAwesomeIcon
            color={themes[currentTheme].textColor}
            size={18}
            icon={secure ? faEye : faEyeSlash}
          />
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
    paddingStart: 20,
  },
  view: {
    borderRadius: 7,
    borderWidth: 1,
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
    fontSize: 16,
  },
});
