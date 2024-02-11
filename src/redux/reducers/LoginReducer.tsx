import {LOGIN_AUTHORIZE, LOGOUT} from '../../constants/AppConstants';
import { UserModel } from '../../models';
const initialState = {
  isLoggedIn: false,
  userEmail: '',
  userInfo: new UserModel(),
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_AUTHORIZE:
        console.log("Reduc Reducer Sign In params:", action.payload.email, action.payload.data)
      return {
        isLoggedIn: true,
        userEmail: action.payload.email,
        userInfo: action.payload.data,
      };
    case LOGOUT:
      return {
        isLoggedIn: false,
        userEmail: '',
        userInfo: null,
      };
    default:
      return state;
  }
};
