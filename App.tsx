import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import HomeScreen from './src/screens/main/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/screens/main/MainNavigation';

function App(): React.JSX.Element {
  return (
      <MainNavigation/>
  );
}

export default App;
