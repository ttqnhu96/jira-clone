import { call, put, select, takeLatest } from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import { CHANGE_ASSIGNEES, CHANGE_TASK_MODAL, CLOSE_DRAWER, CREATE_COMMENT_SAGA, CREATE_TASK_SAGA, DELETE_COMMENT_SAGA, EDIT_COMMENT, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA, GET_PROJECT_DETAIL_SAGA, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_COMMENT_SAGA, UPDATE_STATUS_TASK_SAGA } from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

//Get all task type --->
function* getAllTaskTypeSaga(action) {
    try {
        const { data } = yield call(() => taskService.getAllTaskType());
        yield put({
            type: GET_ALL_TASK_TYPE,
            arrTaskType: data.content
        })

    } catch (err) {
        console.log(err);
        console.log(err.response?.data)
    }

}

export function* theoDoiGetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga)
}
//Get all task type <---


//Create task --->
function* createTaskSaga(action) {

    try {
        yield put({
            type: DISPLAY_LOADING
        })
        const { status } = yield call(() => taskService.createTask(action.taskObject));

        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Create task successfully !');
        } else {
            notifiFunction('error', 'Create task fail !')
        }

        yield put({
            type: CLOSE_DRAWER
        })
    }
    catch (err) {
        notifiFunction('error', 'Create task fail !');
    }

    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}
//Create task <---

//Get task detail --->
function* getTaskDetailSaga(action) {
    const { taskId } = action;

    try {
        const { data } = yield call(() => taskService.getTaskDetail(taskId));

        yield put({
            type: GET_TASK_DETAIL,
            taskDetailModal: data.content
        })

    } catch (err) {

        console.log(err);
        console.log(err.response?.data);

    }


}

export function* theoDoiGetTaskDetailSaga(action) {

    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)

}
//Get task detail <---

//Handle change in task modal and update task --->
export function* handelChangePostApi(action) {
    //Gọi action làm thay đổi taskDetail modal
    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            const { value, name } = action;

            yield put({
                type: CHANGE_TASK_MODAL,
                name,
                value
            });
        }; break;

        case CHANGE_ASSIGNEES: {
            const { userSelected } = action;
            yield put({
                type: CHANGE_ASSIGNEES,
                userSelected
            })

        }; break;

        case REMOVE_USER_ASSIGN: {
            const { userId } = action;
            yield put({
                type: REMOVE_USER_ASSIGN,
                userId
            })
        } break;
        default: break;
    }

    //Save qua api updateTaskSaga
    //Lấy dữ liệu từ state.taskDetailModal 
    let { taskDetailModal } = yield select(state => state.TaskReducer);

    //Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần
    const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
        return user.id;
    });


    const taskUpdateApi = { ...taskDetailModal, listUserAsign }
    try {
        const { status } = yield call(() => taskService.updateTask(taskUpdateApi));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: taskUpdateApi.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateApi.taskId
            })
        }
    } catch (err) {
        console.log(err.response?.data);
        console.log(err);
    }

}

export function* theoDoiHandleChangePostApi() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handelChangePostApi);
}
//Handle change in task modal and update task <---


// Update task status --->
function* updateTaskStatusSaga(action) {

    const { taskUpdateStatus } = action;
    try {

        //Cập nhật api status cho task hiện tại (Task đang mở modal)
        const { status } = yield call(() => taskService.updateStatusTask(taskUpdateStatus));

        //Sau khi thành công gọi lại getProjectDetail saga để sắp xếp lại thông tin các task 
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: taskUpdateStatus.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateStatus.taskId
            })
        }
    } catch (err) {
        console.log(err);
        console.log(err.response?.data);

    }
}

export function* theoDoiUpdateTaskStatusSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga)
}
// Update task status <---

//Get all comment --->
function* getAllCommentSaga(action) {
    try {
        const { data } = yield call(() => taskService.getAllComment());
        yield put({
            type: GET_ALL_COMMENT,
            lstComment: data.content
        })

    } catch (err) {
        console.log(err);
        console.log(err.response?.data)
    }

}

export function* theoDoiGetAllCommentSaga() {
    yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga)
}
//Get all comment <---


//Create comment --->
function* createCommentSaga(action) {
    try {
        const { status } = yield call(() => taskService.createComment(action.commentObject));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.commentObject.taskId
            })
        }
    }
    catch (err) {
        console.log(err);
        console.log(err.response?.data)
    }
}


export function* theoDoiCreateCommentSaga() {
    yield takeLatest(CREATE_COMMENT_SAGA, createCommentSaga);
}
//Create comment <---

//Delete comment --->
function* deleteCommentSaga(action) {
    try {
        const { status } = yield call(() => taskService.deleteComment(action.commentObject.idComment));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.commentObject.taskId
            })
        }
    }
    catch (err) {
        console.log(err);
        console.log(err.response?.data)
    }
}


export function* theoDoiDeleteCommentSaga() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}
//Delete comment <---

//Update comment --->
function* updateCommentSaga(action) {

    try {
        const { status } = yield call(() => taskService.updateComment(action.commentUpdate));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: EDIT_COMMENT,
                commentEdit: {
                    id: -1,
                    content: ''
                }
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.commentUpdate.taskId
            })
        }
    } catch (err) {
        console.log(err);
        console.log(err.response?.data)
    }

    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiUpdateCommentSaga() {
    yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}

//Update comment <---