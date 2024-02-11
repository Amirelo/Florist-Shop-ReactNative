import {LOGIN_AUTHORIZE, LOGOUT} from '../../constants/AppConstants';
import { UserModel } from '../../models';

export const authorizeLogin = (email: string, data: UserModel) => {
  console.log('Redux Action Sign In params:',email, data)
  return {
    type: LOGIN_AUTHORIZE,
    payload: {email: email, data: data},
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
