import {Provider, useSelector} from 'react-redux';
import AuthNavigation from './auth/AuthNavigation';
import React from 'react';
import MainNavigation from './main/MainNavigation';

const AppNavigation = () => {
  const loginStatus: boolean = useSelector(
    (store: any) => store.isLoggedIn.isLoggedIn,
  );

  return <>{loginStatus ? <MainNavigation /> : <AuthNavigation />}</>;
};

export default AppNavigation;
