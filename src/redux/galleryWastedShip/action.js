import { LOAD_GALLERYWASTEDSHIP, ERROR_GALLERYWASTEDSHIP, RESET_GALLERYWASTEDSHIP } from './types'
import { requestWastedShipGallery } from '../../utils/shipInfoRequest'

export const loadGalleryWastedShip = (token, id) => dispatch => {
    requestWastedShipGallery(token, id).then((response) => {
        dispatch((loadData(
            response.data.data,
        )))
    }).catch((error) => {
        dispatch(loadError(error))
    })
}

const loadData = (gallery) => {
    return {
        type : LOAD_GALLERYWASTEDSHIP,
        payload: {
            gallery,
        }
    }
}

const loadError = (error) => {
        return {
        type : ERROR_GALLERYWASTEDSHIP,
        payload: {
            error,
        }
    }
}

export const resetGalleryWastedShip = () => {
    return {
        type : RESET_GALLERYWASTEDSHIP,
    }
}