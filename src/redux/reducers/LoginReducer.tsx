import { LOGIN_AUTHORIZE, LOGOUT } from "../../constants/AppConstants"

const initialState = {
    isLoggedIn: false,
    userEmail: '',
}

export default (state = initialState, action:any) => {
    switch(action.type) {
        case LOGIN_AUTHORIZE:
            return{
                isLoggedIn: true,
                userEmail: action.payload.data
            }
        case LOGOUT:
            return{
                isLoggedIn: false,
                userEmail: '',
            }
        default:
            return state;
    }
}