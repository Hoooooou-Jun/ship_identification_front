import { requestPermission, requestUserData } from '../../utils/userInfoRequest.js'
import { UPDATE_USERINFO, RESET_USERINFO } from './types.js'

export const loginUserInfo = (srvno, password, device_id, token, version) => dispatch => {
    requestUserData(token).then((response) => {
        requestPermission(token).then((res) => {
            dispatch(updateUserInfo(
                srvno,
                password,
                device_id,
                token,
                version,
                response.data.data.name,
                response.data.data.rank,
                response.data.data.position,
                response.data.data.unit,
                response.data.data.phone,
                res.data.data.user_level,
                ))
        })
    })
}

export const editUserInfo = (srvno, password, device_id, token, version, name, rank, position, unit, phone) => dispatch => {
    dispatch(updateUserInfo(
        srvno,
        password,
        device_id,
        token,
        version,
        name,
        rank,
        position,
        unit,
        phone,
    ))
}

const updateUserInfo = (srvno, password, device_id, token, version, name, rank, position, unit, phone, level) => {
    return {
        type: UPDATE_USERINFO,
        payload: {
            srvno: srvno,
            password: password,
            device_id: device_id,
            token: token,
            version: version,
            name: name,
            rank: rank,
            position: position,
            unit: unit,
            phone: phone,
            level: level,
        }
    }
}

export const resetUserInfo = () => {
    return {
        type: RESET_USERINFO,
    }
}