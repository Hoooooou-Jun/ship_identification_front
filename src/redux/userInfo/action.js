import { requestPermission, requestUserData } from '../../utils/userInfoRequest.js'
import { UPDATE_USERINFO, RESET_USERINFO } from './types.js'

export const loginUserInfo = (srvno, password, device_id, token, version) => dispatch => {
    requestUserData(token).then((response) => {
        console.log(response)
        requestPermission(token).then((res) => {
            if(response.data.data.unit == '31직할대' || response.data.data.unit == '93여단' || response.data.data.unit == '93여단 1대대' || response.data.data.unit == '93여단 2대대' || response.data.data.unit == '93여단 3대대' || response.data.data.unit == '93여단 4대대' || response.data.data.unit == '95여단' || response.data.data.unit == '95여단 1대대' || response.data.data.unit == '95여단 2대대' || response.data.data.unit == '96여단' || response.data.data.unit == '96여단 2대대' || response.data.data.unit == '96여단 3대대') {
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
            else if(response.data.data.unit == '사령부' || response.data.data.unit == '직할대' || response.data.data.unit == '97여단' || response.data.data.unit == '97여단 1대대' || response.data.data.unit == '97여단 2대대' || response.data.data.unit == '97여단 3대대' || response.data.data.unit == '98여단' || response.data.data.unit == '98여단 1대대' || response.data.data.unit == '98여단 2대대' || response.data.data.unit == '98여단 3대대' || response.data.data.unit == '98여단 4대대') {
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
            else if(response.data.data.unit == '35직할대' || response.data.data.unit == '105여단' || response.data.data.unit == '105여단 1대대' || response.data.data.unit == '105여단 2대대' || response.data.data.unit == '106여단' || response.data.data.unit == '106여단 1대대') {
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
            else if(response.data.data.unit == '39직할대' || response.data.data.unit == '117여단' || response.data.data.unit == '117여단 1대대' || response.data.data.unit == '117여단 2대대' || response.data.data.unit == '117여단 3대대' || response.data.data.unit == '118여단 1대대' || response.data.data.unit == '118여단 2대대' || response.data.data.unit == '118여단 4대대') {
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
            else if(response.data.data.unit == '50직할대' || response.data.data.unit == '121여단' || response.data.data.unit == '121여단 1대대' || response.data.data.unit == '121여단 2대대' || response.data.data.unit == '122대대' || response.data.data.unit == '122여단 3대대') {
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
            else if(response.data.data.unit == '53직할대' || response.data.data.unit == '125여단' || response.data.data.unit == '125여단 1대대' || response.data.data.unit == '125여단 2대대' || response.data.data.unit == '125여단 3대대' || response.data.data.unit == '125여단 4대대' || response.data.data.unit == '126여단' || response.data.data.unit == '126여단 2대대' || response.data.data.unit == '126여단 3대대' || response.data.data.unit == '127여단' || response.data.data.unit == '127여단 2대대' || response.data.data.unit == '127여단 3대대') {
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
            else if(response.data.data.unit == '해병2여단' || response.data.data.unit == '해병2-1' || response.data.data.unit == '해병2-2' || response.data.data.unit == '해병2-3') {
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
    if(unit == '31직할대' || unit == '93여단' || unit == '93여단 1대대' || unit == '93여단 2대대' || unit == '93여단 3대대' || unit == '93여단 4대대' || unit == '95여단' || unit == '95여단 1대대' || unit == '95여단 2대대' || unit == '96여단' || unit == '96여단 2대대' || unit == '96여단 3대대') {
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
    else if(unit == '사령부' || unit == '직할대' || unit == '97여단' || unit == '97여단 1대대' || unit == '97여단 2대대' || unit == '97여단 3대대' || unit == '98여단' || unit == '98여단 1대대' || unit == '98여단 2대대' || unit == '98여단 3대대' || unit == '98여단 4대대') {
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
    else if(unit == '35직할대' || unit == '105여단' || unit == '105여단 1대대' || unit == '105여단 2대대' || unit == '106여단' || unit == '106여단 1대대') {
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
    else if(unit == '39직할대' || unit == '117여단' || unit == '117여단 1대대' || unit == '117여단 2대대' || unit == '117여단 3대대' || unit == '118여단 1대대' || unit == '118여단 2대대' || unit == '118여단 4대대') {
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
    else if(unit == '50직할대' || unit == '121여단' || unit == '121여단 1대대' || unit == '121여단 2대대' || unit == '122대대' || unit == '122여단 3대대') {
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
    else if(unit == '53직할대' || unit == '125여단' || unit == '125여단 1대대' || unit == '125여단 2대대' || unit == '125여단 3대대' || unit == '125여단 4대대' || unit == '126여단' || unit == '126여단 2대대' || unit == '126여단 3대대' || unit == '127여단' || unit == '127여단 2대대' || unit == '127여단 3대대') {
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
    else if(unit == '해병2여단' || unit == '해병2여단 1대대' || unit == '해병2여단 2대대' || unit == '해병2여단 3대대') {
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