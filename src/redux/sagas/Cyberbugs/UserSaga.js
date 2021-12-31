import { call, delay, takeLatest, put } from 'redux-saga/effects';
import { authenticationService } from '../../../services/AuthenticationService';
import { userService } from '../../../services/UserService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { notifiFunction } from '../../../util/Notification/notificationCyberbugs';
import { ADD_USER_PROJECT_SAGA, CLOSE_DRAWER, CREATE_USER_SAGA, DELETE_USER_SAGA, GET_LIST_PROJECT_SAGA, GET_LIST_USER, GET_LIST_USER_SAGA, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SAGA, GET_USER_SEARCH, REMOVE_USER_PROJECT_SAGA, UPDATE_USER_SAGA } from '../../constants/Cyberbugs/Cyberbugs';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';

//Get user --->
function* getUserSaga(action) {
    try {
        const { data } = yield call(() => userService.getUser(action.keyWord));
        yield put({
            type: GET_USER_SEARCH,
            lstUserSearch: data.content
        })

    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiGetUser() {
    yield takeLatest(GET_USER_SAGA, getUserSaga);
}
//Get user <---


//Add user --->
function* addUserProjectSaga(action) {
    try {
        yield call(() => userService.assignUserProject(action.userProject));
        yield put({
            type: GET_LIST_PROJECT_SAGA
        })
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiAddUserProject() {
    yield takeLatest(ADD_USER_PROJECT_SAGA, addUserProjectSaga);
}
//Add user <---

//Delete user --->
function* removeUserProjectSaga(action) {
    try {
        yield call(() => userService.deleteUserFromProject(action.userProject));
        yield put({
            type: GET_LIST_PROJECT_SAGA
        })

    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiRemoveUserProject() {
    yield takeLatest(REMOVE_USER_PROJECT_SAGA, removeUserProjectSaga);
}
//Delete user <---


//Get user by project ID --->
function* getUserByProjectIdSaga(action) {
    const { idProject } = action;
    try {
        const { data, status } = yield call(() => userService.getUserByProjectId(idProject));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: data.content
            })
        }

    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
        if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: []
            })
        }
    }
}



export function* theoDoiGetUserByProjectIdSaga() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga)
}

//Get user by project ID <---

//Get list user --->
function* getListUserSaga(action) {

    try {
        const { data, status } = yield call(() => userService.getUser(action.userKeyword));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_USER,
                userList: data.content
            })
        }
    } catch (err) {
    }

}

export function* theoDoiGetListUserSaga() {
    yield takeLatest(GET_LIST_USER_SAGA, getListUserSaga);
}
//Get list user <---

//Delete user --->
function* deleteUserSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {
        const { status } = yield call(() => userService.deleteUserById(action.idUser));

        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Delete user successfully !')
            yield put({
                type: GET_LIST_USER_SAGA,
                userKeyword: ''
            })
        } else {
            notifiFunction('error', 'Delete user fail !')
        }
    } catch (err) {
        notifiFunction('error', 'Delete user fail !')
    }

    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiDeleteUserSaga() {
    yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}
//Delete user <---

//Update user --->
function* updateUserSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {
        const { status } = yield call(() => userService.editUser(action.userUpdate));

        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Update user successfully !');

            yield put({
                type: GET_LIST_USER_SAGA,
                userKeyword: ''
            })
        } else {
            notifiFunction('error', 'Update user fail !')
        }

        yield put({
            type: CLOSE_DRAWER
        })
    } catch (err) {
        notifiFunction('error', 'Update user fail !')
    }

    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiUpdateUserSaga() {
    yield takeLatest(UPDATE_USER_SAGA, updateUserSaga);
}

//Update user <---


//Create user --->
function* createUserSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Call api 
    try {
        const { status } = yield call(() => authenticationService.signUp(action.userSignup));

        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Create user successfully !');

            yield put({
                type: GET_LIST_USER_SAGA,
                userKeyword: ''
            })
        } else {
            notifiFunction('error', 'Create user fail !')
        }
        yield put({
            type: CLOSE_DRAWER
        })

    } catch (err) {
        notifiFunction('error', 'Create user fail !')
    }


    yield put({
        type: HIDE_LOADING
    })

}

export function* theoDoiCreateUserSage() {
    yield takeLatest(CREATE_USER_SAGA, createUserSaga);
}
//Create user <---