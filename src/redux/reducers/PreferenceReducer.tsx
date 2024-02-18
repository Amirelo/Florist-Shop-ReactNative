import { FONT_CHANGE, LANG_CHANGE, THEME_CHANGE } from "../../constants/AppConstants"
import lang from "../../language/lang"

const initialState = {
    language: 'en',
    theme: 'defaultTheme',
    font: '',
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
        default:
            return state;
    }
}