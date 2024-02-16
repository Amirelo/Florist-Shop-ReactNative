import React from 'react';
import {
  ColorValue,
  FlexStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';

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
  const selectedType = props.type ? props.type : 'normal';
  return (
    <Text
      numberOfLines={props.maxLines ? props.maxLines : 10}
      style={[
        {
          color: props.color ? props.color : '#000000',
          marginTop: props.marginTop,
          marginBottom: props.marginBottom,
          marginRight: props.marginRight,
          textTransform: props.textTransform,
          alignSelf: props.alignSelf,
          fontFamily:
            props.fontWeight == 'bold'
              ? 'DancingScript-Bold'
              : 'DancingScript-Regular',
        },
        styles[selectedType],
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
