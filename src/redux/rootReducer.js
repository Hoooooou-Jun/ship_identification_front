import { combineReducers } from 'redux';
import reducerUserInfo from './userInfo/reducer.js';
import reducerSearchShip from './searchShip/reducer.js'
import reducerDetailCommonShip from './detailCommonShip/reducer.js';
import reducerShipOwner from './shipOwner/reducer.js'
import reducerGalleryCommonShip from './galleryCommonShip/reducer'

const rootReducer = combineReducers({
    userInfo: reducerUserInfo,
    searchShip: reducerSearchShip,
    detailCommonShip: reducerDetailCommonShip,
    shipOwner: reducerShipOwner,
    galleryCommonShip: reducerGalleryCommonShip,
})

export default rootReducer