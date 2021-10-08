import { LOAD_DETAILWASTEDSHIP, ERROR_DETAILWASTEDSHIP, RESET_DETAILWASTEDSHIP } from './types'
import { deleteWastedShip, requestWastedShipDetail, updateWastedShipDetail, updateWastedShipMImage } from '../../utils/shipInfoRequest'

export const loadDetailWastedShip = (token, id) => dispatch => {
    requestWastedShipDetail(token, id).then((response) => {
        dispatch((loadData(
            id,
            response.data.data.lat,
            response.data.data.lon,
            response.data.data.main_img,
            response.data.data.main_img_id,
            response.data.data.info,
            response.data.data.types,
            response.data.data.region,
            response.data.data.register,
            response.data.data.regit_date,
            response.data.data.img_cnt,
        )))
    }).catch((error) => {
        dispatch(loadError(error))
    })
}

export const updateDetailWastedShip = (token, id, info, latitude, longitude, types, region) => dispatch => {
    updateWastedShipDetail(token, id, info, latitude, longitude, types, region).then((response) => {
        if(response.status == 200) {
            dispatch(loadDetailWastedShip(token, id))
        }
        else {
            console.log('detailwastedship update fail')
        }
    })
}

export const updateWastedShipMainImage = (token, img_id, id,) => dispatch => {
    updateWastedShipMImage(token, img_id).then((response) => {
        if(response.status == 200) {
            dispatch(loadDetailWastedShip(token, id))
        }
        else {
            console.log('wastedship main image update fail')
        }
    })
}

export const deleteWastedShipInfo = (token, id) => dispatch => {
    deleteWastedShip(token, id).then((response) => {
        if(response.status == 200) {
            console.log('wastedship info delete success')
        }
        else {
            console.log('wastedship info delete fail')
        }
    })
}

const loadData = (id, latitude, longitude, main_img, main_img_id, info, types, region, register, regit_date, img_cnt,) => {
    return {
        type : LOAD_DETAILWASTEDSHIP,
        payload: {
            id,
            latitude,
            longitude,
            main_img,
            main_img_id,
            info,
            types,
            region,
            register,
            regit_date,
            img_cnt,
        }
    }
}

const loadError = (error) => {
    return {
        type : ERROR_DETAILWASTEDSHIP,
        payload: {
            error,
        }
    }
}

export const resetDetailWastedShip = () => {
    return {
        type : RESET_DETAILWASTEDSHIP
    }
}