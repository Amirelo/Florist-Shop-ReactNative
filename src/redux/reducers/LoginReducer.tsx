import { LOGIN_AUTHORIZE, LOGOUT } from "../../constants/AppConstants"

const initialState = {
    isLoggedIn: false
}

export default (state = initialState, action:any) => {
    switch(action.type) {
        case LOGIN_AUTHORIZE:
            return{
                ...state,
                isLoggedIn: true
            }
        case LOGOUT:
            return{
                ...state,
                isLoggedIn: false
            }
        default:
            return state;
    }
}