import { CHANGE_ASSIGNEES, CHANGE_TASK_MODAL, EDIT_COMMENT, GET_ALL_COMMENT, GET_ALL_TASK_TYPE, GET_TASK_DETAIL, REMOVE_USER_ASSIGN } from "../constants/Cyberbugs/Cyberbugs"

const initialState = {
    arrTaskType: [],
    taskDetailModal: {
        "priorityTask": {
            "priorityId": 1,
            "priority": "High"
        },
        "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
        },
        "assigness": [],
        "lstComment": [],
        "taskId": 1,
        "taskName": "",
        "alias": "",
        "description": "",
        "statusId": "1",
        "originalEstimate": 0,
        "timeTrackingSpent": 0,
        "timeTrackingRemaining": 0,
        "typeId": 1,
        "priorityId": 1,
        "projectId": 1
    },
    commentEdit : {
        id: -1,
        content: ''
    }
}




export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_TASK_TYPE:
            return { ...state, arrTaskType: action.arrTaskType }

        case GET_TASK_DETAIL: {
            return { ...state, taskDetailModal: action.taskDetailModal }
        }

        case CHANGE_TASK_MODAL: {
            const { name, value } = action;
            return { ...state, taskDetailModal: { ...state.taskDetailModal, [name]: value } }
        }

        case CHANGE_ASSIGNEES: {
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.userSelected];
            return { ...state }
        }

        case REMOVE_USER_ASSIGN: {
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.userId)]
            return { ...state }
        }

        case GET_ALL_COMMENT: {
            state.taskDetailModal.lstComment = [...state.taskDetailModal.assigness, action.lstComment];
            return { ...state }
        }

        case EDIT_COMMENT: {
            return { ...state, commentEdit: action.commentEdit }
        }

        default:
            return state
    }
}