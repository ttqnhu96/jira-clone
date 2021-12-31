import { USER_LOGIN } from "../../util/constants/settingSystem";
import { SIGN_UP_NOTIFICATION, USLOGIN } from "../constants/Cyberbugs/Cyberbugs";

let usLogin = {};

if(localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault =  {
    userLogin : usLogin,
    signUpNotification : -1
}


export const AuthenticationReducer = (state = stateDefault,action) => {
    switch(action.type) {
        case USLOGIN: {
            state.userLogin = action.userLogin;
            return {...state}
        }
        case SIGN_UP_NOTIFICATION: {
            state.signUpNotification = action.signUpNotification;
            return {...state}
        }
        default : return {...state};
    }
}