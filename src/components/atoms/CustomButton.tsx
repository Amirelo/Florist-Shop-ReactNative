import React from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';

interface Props {
  onPressed?(): void;
  children: any;
  style?: StyleProp<ViewStyle>;
}

const CustomButton = (props: Props) => {
  return (
    <Pressable style={props.style} onPress={props.onPressed}>
      {props.children}
    </Pressable>
  );
};

export default CustomButton;
