import { LOAD_DETAILCOMMONSHIP, ERROR_DETAILCOMMONSHIP, RESET_DETAILCOMMONSHIP } from './types'
import { requestCommonShipDetail } from '../../utils/shipInfoRequest'

export const loadDetailShip = (token, id) => dispatch => {
    requestCommonShipDetail(token, id).then((response) => {
        dispatch((loadData(
            id,
            response.data.data.main_img,
            response.data.data.main_img_id,
            response.data.data.name,
            response.data.data.code,
            response.data.data.types,
            response.data.data.is_ais,
            response.data.data.is_vpass,
            response.data.data.is_vhf,
            response.data.data.is_ff,
            response.data.data.port,
            response.data.data.region,
            response.data.data.tons,
            response.data.data.size,
            response.data.data.register,
            response.data.data.regit_date,
            response.data.data.is_train,
            response.data.data.img_cnt,
            response.data.data.lat,
            response.data.data.lon,
            response.data.data.train_img,
        )))
    }).catch((error) => {
        dispatch(loadError(error))
    })
}

const loadData = (id, main_img, main_img_id, name, code, types, is_ais, is_vpass, is_vhf, is_ff, port, region, tons, size, register, regit_date, is_train, img_cnt, lat, lon, train_img) => {
    return {
        type : LOAD_DETAILCOMMONSHIP,
        payload: {
            id,
            main_img,
            main_img_id,
            name,
            code,
            types,
            is_ais,
            is_vpass,
            is_vhf,
            is_ff,
            port,
            region,
            tons,
            size,
            register,
            regit_date,
            is_train,
            img_cnt,
            lat,
            lon,
            train_img,
        }
    }
}

const loadError = (error) => {
        return {
        type : ERROR_DETAILCOMMONSHIP,
        payload: {
            error,
        }
    }
}

export const loadReset = () => {
    return {
        type : RESET_DETAILCOMMONSHIP,
    }
}