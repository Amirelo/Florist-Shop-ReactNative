// React and libs
import {useSelector} from 'react-redux';
import React from 'react';

// Navigation
import AuthNavigation from './auth/AuthNavigation';
import MainNavigation from './main/MainNavigation';

const AppNavigation = () => {
  const loginStatus: boolean = useSelector(
    (store: any) => store.isLoggedIn.isLoggedIn,
  );
  // Login based on status in Redux
  return <>{loginStatus ? <MainNavigation /> : <AuthNavigation />}</>;
};

export default AppNavigation;
