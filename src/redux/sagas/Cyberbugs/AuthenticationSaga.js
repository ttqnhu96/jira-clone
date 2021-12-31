import { call, delay, takeLatest, put } from 'redux-saga/effects';
import { SIGN_UP_NOTIFICATION, USER_SIGNIN_API, USER_SIGNUP_API, USLOGIN } from '../../constants/Cyberbugs/Cyberbugs';
import { authenticationService } from '../../../services/AuthenticationService';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import { history } from '../../../util/history';

//Login --->
function* signinSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Call api 
    try {
        const { data } = yield call(() => authenticationService.signIn(action.userLogin));

        //Save login information to localstorage when login success
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

        yield put({
            type: USLOGIN,
            userLogin: data.content
        })

        history.push('/projectmanagement');

    } catch (err) {
        console.log(err)
    }


    yield put({
        type: HIDE_LOADING
    })

}

export function* theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}
//Login <---


//Sign up --->
function* signUpSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Call api 
    try {
        const { status } = yield call(() => authenticationService.signUp(action.userSignup));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: SIGN_UP_NOTIFICATION,
                signUpNotification: 1
            })
        } else {
            yield put({
                type: SIGN_UP_NOTIFICATION,
                signUpNotification: 0
            })
        }

    } catch (err) {
        yield put({
            type: SIGN_UP_NOTIFICATION,
            signUpNotification: 0
        })
    }


    yield put({
        type: HIDE_LOADING
    })

}

export function* theoDoiSignUp() {
    yield takeLatest(USER_SIGNUP_API, signUpSaga);
}
//Sign up <---