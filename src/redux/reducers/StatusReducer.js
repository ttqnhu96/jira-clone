import { GET_ALL_STATUS } from "../constants/Cyberbugs/Cyberbugs"

const initialState = {
    arrStatus: []
}

export const StatusReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_STATUS:
            return { ...state, arrStatus: action.arrStatus }

        default:
            return state
    }
}