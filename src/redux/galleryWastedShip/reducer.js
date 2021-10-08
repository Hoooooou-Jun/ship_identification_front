import { LOAD_GALLERYWASTEDSHIP, ERROR_GALLERYWASTEDSHIP, RESET_GALLERYWASTEDSHIP} from './types'
import { galleryWastedShip } from './initailData'

const reducerGalleryWastedShip = ( state = galleryWastedShip, action ) => {
    switch(action.type) {
        case LOAD_GALLERYWASTEDSHIP:
            return {
                ...state,
                gallery: action.payload.gallery,
            }
        case ERROR_GALLERYWASTEDSHIP:
            return {
                ...state,
                gallery: '',
                data: action.payload.error, // 주의
            }
        case RESET_GALLERYWASTEDSHIP:
            return {
                ...state,
                gallery: '',
            }
        default: return state
    }
}

export default reducerGalleryWastedShip