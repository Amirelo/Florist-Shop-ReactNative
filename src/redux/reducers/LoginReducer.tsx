import {
  LOGIN_AUTHORIZE,
  LOGOUT,
  UPDATE_USERNAME,
} from '../../constants/AppConstants';
import {UserModel} from '../../models';
const initialState = {
  isLoggedIn: false,
  userEmail: '',
  userInfo: new UserModel(),
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_AUTHORIZE:
      console.log(
        'Redux Reducer Sign In params:',
        action.payload.email,
        action.payload.data,
      );
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

    case UPDATE_USERNAME:
      return {
        ...state,
        userInfo: {
          email: state.userInfo.email,
          username: action.payload.data,
          image: state.userInfo.email,
          phoneNumber: state.userInfo.email,
          themePref: state.userInfo.email,
          langPref: state.userInfo.email,
        },
      };
    default:
      return state;
  }
};
