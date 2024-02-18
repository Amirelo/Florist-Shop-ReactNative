import {
  FONT_CHANGE,
  LANG_CHANGE,
  THEME_CHANGE,
} from '../../constants/AppConstants';

export const changeLanguage = (data: string) => {
  return {type: LANG_CHANGE, payload: {data: data}};
};

export const changeTheme = (data: string) => {
  return {type: THEME_CHANGE, payload: {data: data}};
};

export const changeFontFamily = (data: string) => {
  return {type: FONT_CHANGE, payload: {data: data}};
};
