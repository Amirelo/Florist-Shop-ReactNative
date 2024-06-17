import {Animated, View} from 'react-native';
import {CustomButton, CustomText} from '../atoms';
import themes from '../../themes/themes';
import {useDispatch, useSelector} from 'react-redux';
import {dissmissMessage} from '../../redux/actions/PreferenceAction';
import React from 'react';

const ItemMessage = () => {
  const dispatch = useDispatch();
  const themePref: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const messages: Array<String> = useSelector(
    (store: any) => store.preference.messages,
  );
  const animated = new Animated.Value(0);

  const onDissmissPress = () => {
    dispatch(dissmissMessage());
  };

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // const fadeOut = () => {
  //   Animated.timing(animated, {
  //     toValue: 0,
  //     duration:2000,
  //     useNativeDriver:true
  //   }).start()
  // }

  React.useEffect(() => {
    fadeIn();
  }, [messages]);

  const AnimatedView = Animated.createAnimatedComponent(View);

  return (
    <AnimatedView
      style={{
        width: '90%',
        opacity: animated,
        height: 48,
        maxHeight: messages.length > 0 ? 400 : 0,
        borderRadius: 8,
        backgroundColor: themes[themePref].textColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginHorizontal: 16,
        marginBottom: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}>
      <CustomText
        type={'subTitle'}
        fontWeight="bold"
        style={{
          backgroundColor: themes[themePref].bgColor,
          width: 20,
          borderRadius: 8,
          textAlign: 'center',
        }}>
        {messages.length.toString()}
      </CustomText>
      <CustomText type={'subTitle'} color={themes[themePref].bgColor}>
        {messages.length > 0 ? messages[0] : ''}
      </CustomText>
      <CustomButton onPressed={onDissmissPress}>
        <CustomText color={themes[themePref].bgColor} fontWeight="bold">
          Dismiss
        </CustomText>
      </CustomButton>
    </AnimatedView>
  );
};

export default ItemMessage;
