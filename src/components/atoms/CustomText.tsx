import React from 'react';
import {ColorValue, StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

interface Props {
  children: String;
  color?: ColorValue;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  type?: keyof typeof styles;
  style?: StyleProp<TextStyle>;
  textTransform?: TextStyle['textTransform'],
  maxLines?: number
}

const CustomText = (props: Props) => {
  const selectedType = props.type ? props.type : 'normal';
  return (
    <Text
    numberOfLines={props.maxLines ? props.maxLines : 10}
      style={
        [
          {
            color: props.color ? props.color : '#000000',
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            marginRight: props.marginRight,
            textTransform: props.textTransform ? props.textTransform : 'none',
          },
          styles[selectedType],
          props.style,
        ] 
      }>
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
