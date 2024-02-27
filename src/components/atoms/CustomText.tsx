// React and libs
import React from 'react';
import {
  ColorValue,
  FlexStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';
import {useSelector} from 'react-redux';

// User Preferences
import themes from '../../themes/themes';

interface Props {
  children: String;
  color?: ColorValue;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  type?: keyof typeof styles;
  style?: StyleProp<TextStyle>;
  textTransform?: TextStyle['textTransform'];
  maxLines?: number;
  fontWeight?: TextStyle['fontWeight'];
  alignSelf?: FlexStyle['alignSelf'];
}

const CustomText = (props: Props) => {
  // Available fonts
  const allowFont = ['', 'Inter', 'DancingScript'];

  // User Preferences
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const currentFont: keyof typeof allowFont = useSelector(
    (store: any) => store.preference.font,
  );
  const currentFontScale: number = useSelector(
    (store: any) => store.preference.fontScale,
  );

  const selectedType = props.type ? props.type : 'normal';
  return (
    <Text
      numberOfLines={props.maxLines ? props.maxLines : 10}
      style={[
        {
          color: props.color ? props.color : themes[currentTheme].textColor,
          marginTop: props.marginTop,
          marginBottom: props.marginBottom,
          marginRight: props.marginRight,
          textTransform: props.textTransform,
          alignSelf: props.alignSelf,
          fontFamily:
            props.fontWeight == 'bold'
              ? currentFont.toString() + '-Bold'
              : currentFont.toString() + '-Regular',
          fontWeight:
            currentFont.toString().length > 0 ? undefined : props.fontWeight,
          fontSize: selectedType
            ? currentFont.toString() == 'DancingScript'
              ? styles[selectedType].fontSize + 5 + currentFontScale
              : styles[selectedType].fontSize + currentFontScale
            : styles['normal'].fontSize + currentFontScale,
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  big: {
    fontSize: 40,
  },
  header: {
    fontSize: 32,
  },
  subHeader: {
    fontSize: 30,
  },
  bigTitle: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
  },
  subTitle: {
    fontSize: 16,
  },
  normal: {
    fontSize: 14,
  },
  small: {
    fontSize: 12,
  },
});
