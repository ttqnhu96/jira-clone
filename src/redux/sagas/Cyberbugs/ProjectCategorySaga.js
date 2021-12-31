import { call, put, takeLatest } from "redux-saga/effects";
import { projectService } from "../../../services/ProjectService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../constants/Cyberbugs/Cyberbugs";

function* getAllProjectCategorySaga(action) {
    try {
        const { data, status } = yield call(() => projectService.getAllProjectCategory());

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
            });
        }


    } catch (err) {
        console.log(err);
        console.log(err.response?.data)
    }
}

export function* theoDoigetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}