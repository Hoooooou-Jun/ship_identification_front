import { LOAD_DETAILCOMMONSHIP, ERROR_DETAILCOMMONSHIP, RESET_DETAILCOMMONSHIP } from './types'
import { deleteCommonShip, requestCommonShipDetail, updateCommonShipDetail, updateCommonShipMImage } from '../../utils/shipInfoRequest'

export const loadDetailCommonShip = (token, id) => dispatch => {
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

export const updateDetailCommonShip = (token, id, name, types, code, tons, size, is_ais, is_vhf, is_vpass, is_ff, region, port) => dispatch => {
    updateCommonShipDetail(token, id, name, types, code, tons, size, is_ais, is_vhf, is_vpass, is_ff, region, port).then((response) => {
        if(response.status == 200) {
            dispatch(loadDetailCommonShip(token, id))
        }
        else {
            console.log('detailCommonship update fail')
        }
    })
}

export const updateCommonShipMainImage = (token, img_id, id,) => dispatch => {
    updateCommonShipMImage(token, img_id).then((response) => {
        if(response.status == 200) {
            dispatch(loadDetailCommonShip(token, id))
        }
        else {
            console.log('commonship main image update fail')
        }
    })
}

export const deleteCommonShipInfo = (token, id) => dispatch => {
    deleteCommonShip(token, id).then((response) => {
        if(response.status == 200) {
            console.log('commonship info delete success')
        }
        else {
            console.log('commonship info delete fail')
        }
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

export const resetDetailCommonShip = () => {
    return {
        type : RESET_DETAILCOMMONSHIP,
    }
}