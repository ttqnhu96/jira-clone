import { EDIT_PROJECT, GET_LIST_PROJECT, GET_PROJECT_DROPDOWN_LIST, PUT_PROJECT_DETAIL } from "../constants/Cyberbugs/Cyberbugs";

const initialState = {
    projectList: [],
    projectEdit: {
        "userId": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": "1"
    },
    projectDetail: {},
    projectDropDownList: []
}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_LIST_PROJECT: {
            state.projectList = action.projectList;
            return { ...state };
        }

        case EDIT_PROJECT: {
            state.projectEdit = action.projectEditModel;
            return { ...state }

        }

        case PUT_PROJECT_DETAIL: {
            state.projectDetail = action.projectDetail;
            return { ...state }
        }

        case GET_PROJECT_DROPDOWN_LIST: {
            return { ...state, projectDropDownList: action.projectDropDownList }
        }

        default:
            return state
    }
}