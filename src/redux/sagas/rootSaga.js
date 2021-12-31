import { all } from "redux-saga/effects";
import * as AuthenticationSaga from './Cyberbugs/AuthenticationSaga';
import * as ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga';
import * as ProjectSaga from './Cyberbugs/ProjectSaga';
import * as UserSaga from './Cyberbugs/UserSaga';
import * as PrioritySaga from './Cyberbugs/PrioritySaga';
import * as TaskSaga from './Cyberbugs/TaskSaga';
import * as StatusSaga from './Cyberbugs/StatusSaga';


export function* rootSaga() {

    yield all([
        AuthenticationSaga.theoDoiSignin(),
        AuthenticationSaga.theoDoiSignUp(),

        ProjectCategorySaga.theoDoigetAllProjectCategory(),
        ProjectSaga.theoDoiCreateProjectSaga(),
        ProjectSaga.theoDoiGetListProjectSaga(),
        ProjectSaga.theoDoiUpdateProjectSaga(),
        ProjectSaga.theoDoiDeleteProject(),
        ProjectSaga.theoDoiGetProjectDetail(),
        ProjectSaga.theoDoiGetProjectDropdownListSaga(),

        UserSaga.theoDoiGetUser(),
        UserSaga.theoDoiAddUserProject(),
        UserSaga.theoDoiRemoveUserProject(),
        UserSaga.theoDoiGetUserByProjectIdSaga(),
        UserSaga.theoDoiGetListUserSaga(),
        UserSaga.theoDoiDeleteUserSaga(),
        UserSaga.theoDoiUpdateUserSaga(),
        UserSaga.theoDoiCreateUserSage(),

        StatusSaga.theoDoiGetAllStatusSaga(),

        PrioritySaga.theoDoiGetAllPriority(),

        TaskSaga.theoDoiGetAllTaskTypeSaga(),
        TaskSaga.theoDoiCreateTaskSaga(),
        TaskSaga.theoDoiGetTaskDetailSaga(),
        TaskSaga.theoDoiHandleChangePostApi(),
        TaskSaga.theoDoiUpdateTaskStatusSaga(),
        TaskSaga.theoDoiGetAllCommentSaga(),
        TaskSaga.theoDoiCreateCommentSaga(),
        TaskSaga.theoDoiDeleteCommentSaga(),
        TaskSaga.theoDoiUpdateCommentSaga()
    ])
}