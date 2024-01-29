import {Provider, useSelector} from 'react-redux';
import {store} from '../redux/store';
import AuthNavigation from './auth/AuthNavigation';
import React from 'react';
import MainNavigation from './main/MainNavigation';
import {View} from 'react-native';

const AppNavigation = () => {
  const loginStatus: boolean = useSelector(
    (store: any) => store.isLoggedIn.isLoggedIn,
  );

  return <>{loginStatus ? <MainNavigation /> : <AuthNavigation />}</>;
};

export default AppNavigation;
