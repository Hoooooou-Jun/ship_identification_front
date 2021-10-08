import { combineReducers } from 'redux';
import reducerUserInfo from './userInfo/reducer.js';
import reducerSearchShip from './searchShip/reducer.js'
import reducerDetailCommonShip from './detailCommonShip/reducer.js';
import reducerShipOwner from './shipOwner/reducer.js'
import reducerGalleryCommonShip from './galleryCommonShip/reducer'
import reducerDetailWastedShip from './detailWastedShip/reducer.js';
import reducerGalleryWastedShip from './galleryWastedShip/reducer.js';

const rootReducer = combineReducers({
    userInfo: reducerUserInfo,
    searchShip: reducerSearchShip,
    detailCommonShip: reducerDetailCommonShip,
    shipOwner: reducerShipOwner,
    galleryCommonShip: reducerGalleryCommonShip,
    detailWastedShip: reducerDetailWastedShip,
    galleryWastedShip: reducerGalleryWastedShip,
})

export default rootReducer