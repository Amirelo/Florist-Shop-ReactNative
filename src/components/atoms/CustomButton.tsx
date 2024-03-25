// React and libs
import React from 'react';
import {Animated, Pressable, StyleProp, ViewStyle} from 'react-native';

interface Props {
  onPressed?(): void;
  children?: any;
  style?: StyleProp<ViewStyle>;
  flex?: number;
}

const CustomButton = (props: Props) => {
  const animated = new Animated.Value(1);

  const onPressIn = () => {
    Animated.timing(animated, {
      toValue: 0.6,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <AnimatedPressable
      style={[props.style, {flex: props.flex, opacity: animated}]}
      onPress={props.onPressed}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      {props.children}
    </AnimatedPressable>
  );
};

export default CustomButton;
