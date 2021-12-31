import { EDIT_USER, GET_LIST_USER, GET_USER_BY_PROJECT_ID, GET_USER_SEARCH } from "../constants/Cyberbugs/Cyberbugs";

const stateDefault = {
    userSearch: [],
    arrUser: [],//Array user cho thẻ select create task
    userList: [],
    userEdit: {
        "id": 0,
        "name": "",
        "phoneNumber": 0,
        "email": ""
    },
}

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_USER_SEARCH: {
            state.userSearch = action.lstUserSearch;
            return { ...state }
        }

        case GET_USER_BY_PROJECT_ID: {
            return { ...state, arrUser: action.arrUser }
        }

        case GET_LIST_USER: {
            state.userList = action.userList;
            return { ...state };
        }

        case EDIT_USER: {
            state.userEdit = action.userEditModel;
            return { ...state }

        }

        default: return { ...state };
    }
}