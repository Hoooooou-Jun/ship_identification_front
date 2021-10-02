import { LOAD_GALLERYCOMMONSHIP, ERROR_GALLERYCOMMONSHIP, RESET_GALLERYCOMMONSHIP } from './types'
import { requestCommonShipGallery } from '../../utils/shipInfoRequest'

export const loadGalleryCommonShip = (token, id) => dispatch => {
    requestCommonShipGallery(token, id).then((response) => {
        dispatch((loadData(
            response.data.data,
        )))
    }).catch((error) => {
        dispatch(loadError(error))
    })
}

const loadData = (gallery) => {
    return {
        type : LOAD_GALLERYCOMMONSHIP,
        payload: {
            gallery,
        }
    }
}

const loadError = (error) => {
        return {
        type : ERROR_GALLERYCOMMONSHIP,
        payload: {
            error,
        }
    }
}

export const resetGalleryCommonShip = () => {
    return {
        type : RESET_GALLERYCOMMONSHIP,
    }
}