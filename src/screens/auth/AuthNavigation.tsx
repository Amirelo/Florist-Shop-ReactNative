import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  ActionCompleteScreen,
  SignInScreen,
  SignUpScreen,
  VerifyEmailScreen,
} from './screens';
import {
  NAVIGATION_AUTH_ACTIONCOMPLETE,
  NAVIGATION_AUTH_SIGNIN,
  NAVIGATION_AUTH_SIGNUP,
  NAVIGATION_AUTH_VERIFY,
} from '../../constants/AppConstants';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const generalOption: NativeStackNavigationOptions = {headerShown: false};

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NAVIGATION_AUTH_SIGNIN}>
        <Stack.Screen
          name={NAVIGATION_AUTH_SIGNIN}
          component={SignInScreen}
          options={generalOption}
        />
        <Stack.Screen
          name={NAVIGATION_AUTH_SIGNUP}
          component={SignUpScreen}
          options={generalOption}
        />
        <Stack.Screen
          name={NAVIGATION_AUTH_VERIFY}
          component={VerifyEmailScreen}
          options={generalOption}
        />
        <Stack.Screen
          name={NAVIGATION_AUTH_ACTIONCOMPLETE}
          component={ActionCompleteScreen}
          options={generalOption}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
