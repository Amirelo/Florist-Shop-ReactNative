import { LOGIN_AUTHORIZE, LOGOUT } from "../../constants/AppConstants"

const initialState = {
    isLoggedIn: false
}

export default (state = initialState, action:any) => {
    switch(action.type) {
        case LOGIN_AUTHORIZE:
            return{
                isLoggedIn: true
            }
        case LOGOUT:
            return{
                isLoggedIn: false
            }
        default:
            return state;
    }
}