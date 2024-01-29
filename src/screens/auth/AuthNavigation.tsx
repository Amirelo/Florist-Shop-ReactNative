import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChangePasswordScreen, SignInScreen, SignUpScreen} from './screens';
import React from 'react';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn'>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ChangePass" component={ChangePasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
