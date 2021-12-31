import { baseService } from "./baseService";

export class AuthenticationService extends baseService {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    signIn = (userLogin) => {
        return this.post(`users/signin`, userLogin);
    }

    signUp = (userSignup) => {
        return this.post(`Users/signup`, userSignup);
    }
}


export const authenticationService = new AuthenticationService();