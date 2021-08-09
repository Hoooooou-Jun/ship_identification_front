import { combineReducers } from 'redux';
import reducerUserInfo from './userInfo/reducer.js';

const rootReducer = combineReducers({
    userInfo: reducerUserInfo,
})

export default rootReducer