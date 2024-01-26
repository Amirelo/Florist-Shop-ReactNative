import React from 'react';
import {ColorValue, StyleSheet, Text, TextStyle} from 'react-native';

interface Props {
  children: String;
  color?: ColorValue;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  type?: keyof typeof styles;
  style?: any;
}

const CustomText = (props: Props) => {
  const selectedType = props.type ? props.type : 'normal';
  return (
    <Text
      style={
        [
          {
            color: props.color ? props.color : '#000000',
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            marginRight: props.marginRight,
            textTransform: 'capitalize'
          },
          styles[selectedType],
          props.style,
        ] as TextStyle
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
