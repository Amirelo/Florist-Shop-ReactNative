import { LANG_CHANGE, THEME_CHANGE } from "../../constants/AppConstants"
import lang from "../../language/lang"

const initialState = {
    language: 'en',
    theme: 'defaultTheme'
}

export default (state = initialState, action:any) => {
    switch(action.type){
        case LANG_CHANGE:
            return {
                language: action.payload.data
            }
        case THEME_CHANGE:
            return{
                theme: action.payload.data
            }
        default:
            return state;
    }
}