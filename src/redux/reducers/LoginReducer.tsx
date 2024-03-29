import {
  LOGIN_AUTHORIZE,
  LOGOUT,
  UPDATE_USERNAME,
  UPDATE_USER_PROFILE_PICTURE,
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
          image: state.userInfo.image,
          phoneNumber: state.userInfo.phoneNumber,
          themePref: state.userInfo.themePref,
          langPref: state.userInfo.langPref,
        },
      };

    case UPDATE_USER_PROFILE_PICTURE:
      return {
        ...state,
        userInfo: {
          email: state.userInfo.email,
          username: state.userInfo.username,
          image: action.payload.data,
          phoneNumber: state.userInfo.phoneNumber,
          themePref: state.userInfo.themePref,
          langPref: state.userInfo.langPref,
        },
      };
    default:
      return state;
  }
};
