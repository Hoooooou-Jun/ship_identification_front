import { SEARCH_COMMONSHIP, SEARCH_WASTEDSHIP, SEARCH_ERROR, SEARCH_RESET } from './types.js'
import { resultSearchShip } from './initialData.js'

const reducerSearchShip = ( state = resultSearchShip, action ) => {
    switch(action.type) {
        case SEARCH_COMMONSHIP:
            return {
                ...state,
                flag: action.payload.flag,
                name: action.payload.name,
                types: action.payload.types,
                code: action.payload.code,
                tons: action.payload.tons,
                size: action.payload.size,
                is_ais: action.payload.is_ais,
                is_vpass: action.payload.is_vpass,
                is_vhf: action.payload.is_vhf,
                is_ff: action.payload.is_ff,
                region: action.payload.region,
                port: action.payload.port,
                sort: action.payload.sort,
                unit: action.payload.unit,
                id: '',
                info: '',
                cnt: action.payload.cnt,
                data: action.payload.data,
            }
        case SEARCH_WASTEDSHIP:
            return {
                ...state,
                flag: action.payload.flag,
                name: '',
                types: action.payload.types,
                code: '',
                tons: '',
                size: '',
                is_ais: false,
                is_vpass: false,
                is_vhf: false,
                is_ff: false,
                region: action.payload.region,
                port: '',
                sort: action.payload.sort,
                unit: action.payload.unit,
                id: action.payload.id,
                info: '',
                cnt: action.payload.cnt,
                data: action.payload.data,
            }
        case SEARCH_ERROR:
            return {
                ...state,
                flag: '',
                name: '',
                types: '',
                code: '',
                tons: '',
                size: '',
                is_ais: false,
                is_vpass: false,
                is_vhf: false,
                is_ff: false,
                region: '',
                port: '',
                sort: '',
                unit: '',
                id: '',
                info: '',
                cnt: 0,
                data: action.payload.error,
            }
        case SEARCH_RESET:
            return {
                ...state,
                flag: '',
                name: '',
                types: '',
                code: '',
                tons: '',
                size: '',
                is_ais: false,
                is_vpass: false,
                is_vhf: false,
                is_ff: false,
                region: '',
                port: '',
                sort: '',
                unit: '',
                id: '',
                info: '',
                cnt: 0,
                data: [],
            }
        default: return state;
    }
}

export default reducerSearchShip;