import { requestPermission, requestUserData } from '../../utils/userInfoRequest.js'
import { UPDATE_USERINFO, RESET_USERINFO } from './types.js'

export const loginUserInfo = (srvno, password, device_id, token, version) => dispatch => {
    requestUserData(token).then((response) => {
        requestPermission(token).then((res) => {
            if(response.data.data.unit == '31직할대' || response.data.data.unit == '93-1' || response.data.data.unit == '93-2' || response.data.data.unit == '93-3' || response.data.data.unit == '93-4' || response.data.data.unit == '95' || response.data.data.unit == '95-1' || response.data.data.unit == '95-2' || response.data.data.unit == '96' || response.data.data.unit == '96-2' || response.data.data.unit == '96-3') {
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
                    '제31보병사단',
                    ))
            }
            else if(response.data.data.unit == '사령부' || response.data.data.unit == '직할대' || response.data.data.unit == '97' || response.data.data.unit == '97-1' || response.data.data.unit == '97-2' || response.data.data.unit == '97-3' || response.data.data.unit == '98' || response.data.data.unit == '98-1' || response.data.data.unit == '98-2' || response.data.data.unit == '98-3' || response.data.data.unit == '98-4') {
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
                    '제32보병사단'
                    ))
            }
            else if(response.data.data.unit == '35직할대' || response.data.data.unit == '105' || response.data.data.unit == '105-1' || response.data.data.unit == '105-2' || response.data.data.unit == '106' || response.data.data.unit == '106-1') {
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
                    '제35보병사단'
                    ))
            }
            else if(response.data.data.unit == '39직할대' || response.data.data.unit == '117' || response.data.data.unit == '117-1' || response.data.data.unit == '117-2' || response.data.data.unit == '117-3' || response.data.data.unit == '118-1' || response.data.data.unit == '118-2' || response.data.data.unit == '118-4') {
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
                    '제39보병사단'
                    ))
            }
            else if(response.data.data.unit == '50직할대' || response.data.data.unit == '121' || response.data.data.unit == '121-1' || response.data.data.unit == '121-2' || response.data.data.unit == '122' || response.data.data.unit == '122-3') {
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
                    '제50보병사단'
                    ))
            }
            else if(response.data.data.unit == '53직할대' || response.data.data.unit == '125' || response.data.data.unit == '125-1' || response.data.data.unit == '125-2' || response.data.data.unit == '125-3' || response.data.data.unit == '125-4' || response.data.data.unit == '126' || response.data.data.unit == '126-2' || response.data.data.unit == '126-3' || response.data.data.unit == '127' || response.data.data.unit == '127-2' || response.data.data.unit == '127-3') {
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
                    '제53보병사단'
                    ))
            }
            else if(response.data.data.unit == '2여단' || response.data.data.unit == '2-1' || response.data.data.unit == '2-2' || response.data.data.unit == '2-3') {
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
                    '대한민국 해병대'
                    ))
            }
            else {
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
                    '정보없음'
                    ))
            }
        })
    })
}

export const editUserInfo = (srvno, password, device_id, token, version, name, rank, position, unit, phone, level) => dispatch => {
    if(response.data.data.unit == '31직할대' || response.data.data.unit == '93-1' || response.data.data.unit == '93-2' || response.data.data.unit == '93-3' || response.data.data.unit == '93-4' || response.data.data.unit == '95' || response.data.data.unit == '95-1' || response.data.data.unit == '95-2' || response.data.data.unit == '96' || response.data.data.unit == '96-2' || response.data.data.unit == '96-3') {
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
            level,
            '제31보병사단'
        ))
    }
    else if(response.data.data.unit == '사령부' || response.data.data.unit == '직할대' || response.data.data.unit == '97' || response.data.data.unit == '97-1' || response.data.data.unit == '97-2' || response.data.data.unit == '97-3' || response.data.data.unit == '98' || response.data.data.unit == '98-1' || response.data.data.unit == '98-2' || response.data.data.unit == '98-3' || response.data.data.unit == '98-4') {
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
            level,
            '제32보병사단'
        ))
    }
    else if(response.data.data.unit == '35직할대' || response.data.data.unit == '105' || response.data.data.unit == '105-1' || response.data.data.unit == '105-2' || response.data.data.unit == '106' || response.data.data.unit == '106-1') {
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
            level,
            '제35보병사단'
        ))
    }
    else if(response.data.data.unit == '39직할대' || response.data.data.unit == '117' || response.data.data.unit == '117-1' || response.data.data.unit == '117-2' || response.data.data.unit == '117-3' || response.data.data.unit == '118-1' || response.data.data.unit == '118-2' || response.data.data.unit == '118-4') {
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
            level,
            '제39보병사단'
        ))
    }
    else if(response.data.data.unit == '50직할대' || response.data.data.unit == '121' || response.data.data.unit == '121-1' || response.data.data.unit == '121-2' || response.data.data.unit == '122' || response.data.data.unit == '122-3') {
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
            level,
            '제50보병사단'
        ))
    }
    else if(response.data.data.unit == '53직할대' || response.data.data.unit == '125' || response.data.data.unit == '125-1' || response.data.data.unit == '125-2' || response.data.data.unit == '125-3' || response.data.data.unit == '125-4' || response.data.data.unit == '126' || response.data.data.unit == '126-2' || response.data.data.unit == '126-3' || response.data.data.unit == '127' || response.data.data.unit == '127-2' || response.data.data.unit == '127-3') {
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
            level,
            '제53보병사단'
        ))
    }
    else if(response.data.data.unit == '2여단' || response.data.data.unit == '2-1' || response.data.data.unit == '2-2' || response.data.data.unit == '2-3') {
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
            level,
            '대한민국 해병대'
        ))
    }
    else {
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
            level,
            '정보없음'
        ))
    }
}

const updateUserInfo = (srvno, password, device_id, token, version, name, rank, position, unit, phone, level, div) => {
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
            div: div,
        }
    }
}

export const resetUserInfo = () => {
    return {
        type: RESET_USERINFO,
    }
}