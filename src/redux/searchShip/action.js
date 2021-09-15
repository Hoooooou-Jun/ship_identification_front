import { SEARCH_COMMONSHIP, SEARCH_WASTEDSHIP, SEARCH_ERROR, SEARCH_RESET } from './types.js'
import { searchCommonShip, searchWastedShip } from '../../utils/shipInfoRequest';

export const searchShip = (idx, token, flag, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port, id, info, sort, unit) => dispatch => {
    if(flag == 'Normal') {
        searchCommonShip(token, idx, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port, sort, unit)
        .then((response) => {
            dispatch(commonShip(
                flag, 
                name,
                types, 
                code, 
                tons, 
                size, 
                is_ais, 
                is_vpass, 
                is_vhf, 
                is_ff, 
                region,
                port,
                sort, 
                unit,
                response.data.data.count,
                response.data.data.data,
                ))
            }).catch((error) => {
                dispatch(searchError(error))
            })}

    else if(flag == 'Wasted') {
        searchWastedShip(token, idx, id, region, types, info, sort, unit)
        .then((response) => {
                dispatch(wastedShip( 
                flag, 
                id, 
                region, 
                types, 
                info, 
                sort, 
                unit,
                response.data.data.count,
                response.data.data.data,
                ))
            }).catch((error) => {
                dispatch(searchError(error))
            })}
        }

export const resetSearch = () => {
    return {
        type: SEARCH_RESET,
    }
}

const commonShip = (flag, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port, sort, unit, cnt, data) => {
    return {
        type: SEARCH_COMMONSHIP,
        payload: {
            flag,
            name,
            types,
            code,
            tons,
            size,
            is_ais,
            is_vpass,
            is_vhf,
            is_ff,
            region,
            port,
            sort,
            unit,
            cnt,
            data,
        }}}

const wastedShip = (flag, id, region, types, info, sort, unit, cnt, data) => {
    return {
        type: SEARCH_WASTEDSHIP,
        payload: {
            flag,
            id,
            region,
            types,
            info,
            sort,
            unit,
            cnt,
            data,
        }}}

const searchError = (error) => {
    return {
        type: SEARCH_ERROR,
        payload: {
            error,
        }}}