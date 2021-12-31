import { call, put, takeLatest } from "redux-saga/effects";
import { priorityService } from "../../../services/PriorityService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../../constants/Cyberbugs/Cyberbugs";


function* getAllPriority() {
    try {
        const { data, status } = yield call(() => priorityService.getAllPriority());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PRIORITY, 
                arrPriority : data.content
            })
        }
    } catch (err) {
        console.log(err.response.data);}
}


export function* theoDoiGetAllPriority() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPriority);
}