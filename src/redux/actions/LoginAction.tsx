import {
  LOGIN_AUTHORIZE,
  LOGOUT,
  UPDATE_USERNAME,
  UPDATE_USER_PROFILE_PICTURE,
} from '../../constants/AppConstants';
import {UserModel} from '../../models';

export const authorizeLogin = (email: string, data: UserModel) => {
  console.log('Redux Action Sign In params:', email, data);
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

export const ReduxUpdateUser = (actionType: string, data: string) => {
  if (actionType == 'USERNAME') {
    return {
      type: UPDATE_USERNAME,
      payload: {data: data},
    };
  }
  if (actionType == 'IMAGE'){
    return {
      type:UPDATE_USER_PROFILE_PICTURE,
      payload: {data: data}
    }
  }
  return {
    type: UPDATE_USERNAME,
    payload: {data: data},
  };
};
