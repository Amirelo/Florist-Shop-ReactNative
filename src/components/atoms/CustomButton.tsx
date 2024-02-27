// React and libs
import React from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';

interface Props {
  onPressed?(): void;
  children?: any;
  style?: StyleProp<ViewStyle>;
  flex?: number;
}

const CustomButton = (props: Props) => {
  return (
    <Pressable
      style={[props.style, {flex: props.flex}]}
      onPress={props.onPressed}>
      {props.children}
    </Pressable>
  );
};

export default CustomButton;
