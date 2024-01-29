import { LOGIN_AUTHORIZE, LOGOUT } from "../../constants/AppConstants"

export const authorizeLogin = () => {
    return {
        type: LOGIN_AUTHORIZE
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}