import { call, delay, put, takeLatest } from "redux-saga/effects";
import { projectService } from "../../../services/ProjectService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { CLOSE_DRAWER, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA, GET_PROJECT_DETAIL_SAGA, GET_PROJECT_DROPDOWN_LIST, GET_PROJECT_DROPDOWN_LIST_SAGA, GET_USER_BY_PROJECT_ID_SAGA, PUT_PROJECT_DETAIL, UPDATE_PROJECT_SAGA } from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";

//Create project --->
function* createProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {
        const { status } = yield call(() => projectService.createProject(action.newProject));

        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Create project successfully !')
            history.push('/projectmanagement');
        } else {
            notifiFunction('error', 'Create project fail !')
        }

    } catch (err) {
        notifiFunction('error', 'Create project fail !')
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiCreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}
//Create project <---




//Get list project --->
function* getListProjectSaga() {
    try {
        const { data, status } = yield call(() => projectService.getAllProject());

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT,
                projectList: data.content
            })
        }
    } catch (err) {
    }

}

export function* theoDoiGetListProjectSaga() {
    yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}
//Get list project <---


//Update Project --->
function* updateProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {
        const { status } = yield call(() => projectService.updateProject(action.projectUpdate));

        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Update project successfully !')
        } else {
            notifiFunction('error', 'Update project fail !')
        }

        yield call(getListProjectSaga);
        yield put({
            type: CLOSE_DRAWER
        })
    } catch (err) {
        notifiFunction('error', 'Update project fail !')
    }

    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiUpdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

//Update Project <---


//Delete project --->
function* deleteProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {
        const { status } = yield call(() => projectService.deleteProject(action.idProject));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Delete project successfully !')
        } else {
            notifiFunction('error', 'Delete project fail !')
        }

        yield call(getListProjectSaga);
    } catch (err) {
        notifiFunction('error', 'Delete project fail !')
    }

    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiDeleteProject() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}
//Delete project <---

//Get project detail --->
function* getProjectDetailSaga(action) {
    try {
        const { data } = yield call(() => projectService.getProjectDetail(action.projectId));

        yield put({
            type: PUT_PROJECT_DETAIL,
            projectDetail: data.content
        })

    } catch (err) {
        console.log('404 not found !')
        history.push('/projectmanagement');
    }
}

export function* theoDoiGetProjectDetail() {
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}
//Get project detail <---

//Get projects to display in dropdown list <---
function* getProjectDropdownListSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {
        const { data } = yield call(() => projectService.getAllProject());

        yield put({
            type: GET_PROJECT_DROPDOWN_LIST,
            projectDropDownList: data.content
        })

        yield put({
            type: GET_USER_BY_PROJECT_ID_SAGA,
            idProject: data.content[0].id
        })

    } catch (err) {
        console.log('404 not found !');
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiGetProjectDropdownListSaga() {
    yield takeLatest(GET_PROJECT_DROPDOWN_LIST_SAGA, getProjectDropdownListSaga);
}
//Get projects to display in dropdown list <---