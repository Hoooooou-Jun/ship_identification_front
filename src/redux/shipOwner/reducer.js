import { LOAD_SHIPOWNER, ERROR_SHIPOWNER, RESET_SHIPOWNER } from './types'
import { shipOwner } from './initailData'

const reducerShipOwner = ( state = shipOwner, action ) => {
    switch(action.type) {
        case LOAD_SHIPOWNER:
            return {
                ...state,
                privacyAgreement: action.payload.privacyAgreement,
                own_img: action.payload.own_img,
                own_name: action.payload.own_name,
                phone: action.payload.phone,
                address: action.payload.address,
                agreement_paper: action.payload.agreement_paper,
            }
        case ERROR_SHIPOWNER:
            return {
                ...state,
                privacyAgreement: false,
                own_img: '',
                own_name: '',
                phone: '',
                address: '',
                agreement_paper: '',
                data: action.payload.error, // 주의
            }
        case RESET_SHIPOWNER:
            return {
                ...state,
                privacyAgreement: false,
                own_img: '',
                own_name: '',
                phone: '',
                address: '',
                agreement_paper: '',
            }
        default: return state
    }
}

export default reducerShipOwner