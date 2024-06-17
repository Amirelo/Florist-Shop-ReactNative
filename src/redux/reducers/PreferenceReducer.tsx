import {
  FONT_CHANGE,
  FONT_SIZE_CHANGE,
  LANG_CHANGE,
  MESSAGE_ADD,
  MESSAGE_DISMISS,
  RESET_PREFERENCE,
  THEME_CHANGE,
} from '../../constants/AppConstants';

const initialState = {
  language: 'vn',
  theme: 'defaultTheme',
  font: '',
  fontScale: 0,
  messages: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LANG_CHANGE:
      return {
        ...state,
        language: action.payload.data,
      };
    case THEME_CHANGE:
      return {
        ...state,
        theme: action.payload.data,
      };
    case FONT_CHANGE:
      return {
        ...state,
        font: action.payload.data,
      };
    case FONT_SIZE_CHANGE:
      return {
        ...state,
        fontScale: state.fontScale + action.payload.data,
      };
    case RESET_PREFERENCE:
      return {
        language: 'vn',
        theme: 'defaultTheme',
        font: '',
        fontScale: 0,
      };
    case MESSAGE_ADD:
      return {
        ...state,
        messages: [...state.messages, action.payload.data]
      }
    case MESSAGE_DISMISS:
      return {
        ...state,
        messages: state.messages.length > 1 ? state.messages.slice(1, state.messages.length) : []
      }
    default:
      return state;
  }
};
