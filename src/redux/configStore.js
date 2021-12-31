import { applyMiddleware, combineReducers, createStore } from 'redux';
import { LoadingReducer } from '../redux/reducers/LoadingReducer';
import { AuthenticationReducer } from './reducers/AuthenticationReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';
import { DrawerCyberbugsReducer } from './reducers/DrawerCyberbugsReducer';
import { ProjectReducer } from './reducers/ProjectReducer';
import { UserReducer } from './reducers/UserReducer';
import { PriorityReducer } from './reducers/PriorityReducer';
import { StatusReducer } from './reducers/StatusReducer';
import { TaskReducer } from './reducers/TaskReducer';

//middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    LoadingReducer,
    AuthenticationReducer,
    ProjectCategoryReducer,
    DrawerCyberbugsReducer,
    ProjectReducer,
    UserReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer
})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;