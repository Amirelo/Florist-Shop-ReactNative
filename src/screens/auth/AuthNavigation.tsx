import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ActionCompleteScreen,
  SignInScreen,
  SignUpScreen,
  VerifyEmailScreen,
} from './screens';
import React from 'react';
import {
  NAVIGATION_AUTH_ACTIONCOMPLETE,
  NAVIGATION_AUTH_SIGNIN,
  NAVIGATION_AUTH_SIGNUP,
  NAVIGATION_AUTH_VERIFY,
} from '../../constants/AppConstants';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NAVIGATION_AUTH_SIGNIN}>
        <Stack.Screen
          name={NAVIGATION_AUTH_SIGNIN}
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NAVIGATION_AUTH_SIGNUP}
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NAVIGATION_AUTH_VERIFY}
          component={VerifyEmailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NAVIGATION_AUTH_ACTIONCOMPLETE}
          component={ActionCompleteScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
