import {
  FONT_CHANGE,
  FONT_SIZE_CHANGE,
  LANG_CHANGE,
  MESSAGE_ADD,
  MESSAGE_DISMISS,
  RESET_PREFERENCE,
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

export const changeFontSize = (data: number) => {
  return {type: FONT_SIZE_CHANGE, payload: {data: data}};
};

export const resetUserPreference = () => {
  return {type: RESET_PREFERENCE};
};

export const addMessage = (data: string) => {
  return {type:MESSAGE_ADD, payload:{data:data}};
}

export const dissmissMessage = () => {
  return {type:MESSAGE_DISMISS}
}
