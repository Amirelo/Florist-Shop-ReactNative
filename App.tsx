import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './src/screens/main/MainNavigation';

function App(): React.JSX.Element {
  return (
      <MainTab/>
  );
}

export default App;
