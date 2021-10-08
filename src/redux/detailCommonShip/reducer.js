import { LOAD_DETAILCOMMONSHIP, ERROR_DETAILCOMMONSHIP, RESET_DETAILCOMMONSHIP } from './types'
import { detailCommonShip } from './initailData'

const reducerDetailCommonShip = ( state = detailCommonShip, action ) => {
    switch(action.type) {
        case LOAD_DETAILCOMMONSHIP:
            return {
                ...state,
                id: action.payload.id,
                main_img: action.payload.main_img,
                main_img_id: action.payload.main_img_id,
                name: action.payload.name,
                code: action.payload.code,
                types: action.payload.types,
                is_ais: action.payload.is_ais,
                is_vpass: action.payload.is_vpass,
                is_vhf: action.payload.is_vhf,
                is_ff: action.payload.is_ff,
                port: action.payload.port,
                region: action.payload.region,
                tons: action.payload.tons,
                size: action.payload.size,
                register: action.payload.register,
                regit_date: action.payload.regit_date,
                is_train: action.payload.is_train,
                img_cnt: action.payload.img_cnt,
                lat: action.payload.lat,
                lon: action.payload.lon,
                train_img: action.payload.train_img,
            }
        case ERROR_DETAILCOMMONSHIP:
            return {
                id: '',
                main_img: '',
                main_img_id: '',
                name: '',
                code: '',
                types: '',
                is_ais: false,
                is_vpass: false,
                is_vhf: false,
                is_ff: false,
                port: '',
                region: '',
                tons: '',
                size: '',
                register: '',
                regit_date: '',
                is_train: false,
                img_cnt: '',
                lat: '',
                lon: '',
                train_img: '',
                data: action.payload.error, // 주의
            }
        case RESET_DETAILCOMMONSHIP:
            return {
                ...state,
                id: '',
                main_img: '',
                main_img_id: '',
                name: '',
                code: '',
                types: '',
                is_ais: false,
                is_vpass: false,
                is_vhf: false,
                is_ff: false,
                port: '',
                region: '',
                tons: '',
                size: '',
                register: '',
                regit_date: '',
                is_train: false,
                img_cnt: '',
                lat: '',
                lon: '',
                train_img: '',
            }
        default: return state
    }
}

export default reducerDetailCommonShip