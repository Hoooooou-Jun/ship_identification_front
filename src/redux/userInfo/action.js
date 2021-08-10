import { requestUserData } from '../../utils/userInfoRequest.js'
import { UPDATE_USERINFO } from './types.js'

export const updateUserInfo = (srvno, password, device_id, token, version) => dispatch => {
    requestUserData(token).then((response) => {
        dispatch(addUserInfo(srvno, password, device_id, token, version, response))
    })
}

const addUserInfo = (srvno, password, device_id, token, version, response) => {
    return {
        type: UPDATE_USERINFO,
        payload: {
            srvno: srvno,
            password: password,
            device_id: device_id,
            token: token,
            version: version,
            name: response.data.data.name,
            rank: response.data.data.rank,
            position: response.data.data.position,
            unit: response.data.data.unit,
            phone: response.data.data.phone,
        }
    }
}