import { detailWastedShip } from './initailData'
import { LOAD_DETAILWASTEDSHIP, ERROR_DETAILWASTEDSHIP, RESET_DETAILWASTEDSHIP } from './types'

const reducerDetailWastedShip = ( state = detailWastedShip, action ) => {
    switch(action.type) {
        case LOAD_DETAILWASTEDSHIP:
            return {
                ...state,
                id: action.payload.id,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                main_img: action.payload.main_img,
                main_img_id: action.payload.main_img_id,
                info: action.payload.info,
                types: action.payload.types,
                region: action.payload.region,
                register: action.payload.register,
                regit_date: action.payload.regit_date,
                img_cnt: action.payload.img_cnt,
            }
        case ERROR_DETAILWASTEDSHIP:
            return {
                id: '',
                latitude: 0,
                longitude: 0,
                main_img: '',
                main_img_id: '',
                info: '',
                types: '',
                region: '',
                register: '',
                regit_date: '',
                img_cnt: '',
                data: action.payload.error,
            }
        case RESET_DETAILWASTEDSHIP:
            return {
                ...state,
                id: '',
                latitude: 0,
                longitude: 0,
                main_img: '',
                main_img_id: '',
                info: '',
                types: '',
                region: '',
                register: '',
                regit_date: '',
                img_cnt: '',
            }
        default: return state
    }
}
export default reducerDetailWastedShip