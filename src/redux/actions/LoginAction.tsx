import {LOGIN_AUTHORIZE, LOGOUT} from '../../constants/AppConstants';

export const authorizeLogin = (data: string) => {
  return {
    type: LOGIN_AUTHORIZE,
    payload: {data: data},
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
