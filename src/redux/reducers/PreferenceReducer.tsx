import { FONT_CHANGE, FONT_SIZE_CHANGE, LANG_CHANGE, THEME_CHANGE } from "../../constants/AppConstants"

const initialState = {
    language: 'en',
    theme: 'defaultTheme',
    font: '',
    fontScale: 0
}

export default (state = initialState, action:any) => {
    switch(action.type){
        case LANG_CHANGE:
            return {
                ...state,
                language: action.payload.data
            }
        case THEME_CHANGE:
            return{
                ...state,
                theme: action.payload.data
            }
        case FONT_CHANGE:
            return{
                ...state,
                font: action.payload.data
            }
        case FONT_SIZE_CHANGE:
            return {
                ...state,
                fontScale: state.fontScale + action.payload.data
            }
        default:
            return state;
    }
}