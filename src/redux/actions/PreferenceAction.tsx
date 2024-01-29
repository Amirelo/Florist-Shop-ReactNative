import {LANG_CHANGE, THEME_CHANGE} from '../../constants/AppConstants';

export const changeLanguage = (data: string) => {
  return {type: LANG_CHANGE, payload: {data: data}};
};

export const changeTheme = () => {
  return {type: THEME_CHANGE};
};
