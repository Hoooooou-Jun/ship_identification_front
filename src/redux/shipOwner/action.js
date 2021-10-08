import { LOAD_SHIPOWNER, ERROR_SHIPOWNER, RESET_SHIPOWNER} from './types'
import { requestShipOwner } from '../../utils/shipInfoRequest'

export const loadShipOwner = (token, id) => dispatch => {
    requestShipOwner(token, id).then((response) => {
        console.log(response.data.data)
        dispatch((loadData(
            id,
            response.data.data.privacy_agree,
            response.data.data.own_img,
            response.data.data.own_name,
            response.data.data.phone,
            response.data.data.address,
            response.data.data.agreement_paper,
        )))
    }).catch((error) => {
        dispatch(loadError(error))
    })
}

const loadData = (id, privacyAgreement, own_img, own_name, phone, address, agreement_paper) => {
    return {
        type : LOAD_SHIPOWNER,
        payload: {
            id,
            privacyAgreement,
            own_img,
            own_name,
            phone,
            address,
            agreement_paper,
        }
    }
}

const loadError = (error) => {
        return {
        type : ERROR_SHIPOWNER,
        payload: {
            error,
        }
    }
}

export const resetShipOwner = () => {
    return {
        type : RESET_SHIPOWNER,
    }
}