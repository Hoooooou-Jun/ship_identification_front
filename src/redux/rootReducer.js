import { combineReducers } from 'redux';
import reducerUserInfo from './userInfo/reducer.js';
import reducerSearchShip from './searchShip/reducer.js'

const rootReducer = combineReducers({
    userInfo: reducerUserInfo,
    searchShip: reducerSearchShip,
})

export default rootReducer