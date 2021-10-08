import { LOAD_GALLERYCOMMONSHIP, ERROR_GALLERYCOMMONSHIP, RESET_GALLERYCOMMONSHIP} from './types'
import { galleryCommonShip } from './initailData'

const reducerGalleryCommonShip = ( state = galleryCommonShip, action ) => {
    switch(action.type) {
        case LOAD_GALLERYCOMMONSHIP:
            return {
                ...state,
                gallery: action.payload.gallery,
            }
        case ERROR_GALLERYCOMMONSHIP:
            return {
                ...state,
                gallery: '',
                data: action.payload.error, // 주의
            }
        case RESET_GALLERYCOMMONSHIP:
            return {
                ...state,
                gallery: '',
            }
        default: return state
    }
}

export default reducerGalleryCommonShip