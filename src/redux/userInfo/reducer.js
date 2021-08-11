import { RESET_USERINFO, UPDATE_USERINFO } from "./types.js";
import { userInfo } from "./initialData.js"
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";

const reducerUserInfo = ( state = userInfo, action ) => {
    switch(action.type) {
        case UPDATE_USERINFO:
            return {
                ...state,
                srvno: action.payload.srvno,
                password: action.payload.password,
                device_id: action.payload.device_id,
                token: action.payload.token,
                version: action.payload.version,
                name: action.payload.name,
                rank: action.payload.rank,
                position: action.payload.position,
                unit: action.payload.unit,
                phone: action.payload.phone,
            }
        case RESET_USERINFO:
            return {
                ...state,
                srvno: '',
                password: '',
                device_id: '',
                token: '',
                version: '',
                name: '',
                rank: '',
                position: '',
                unit: '',
                phone: '',
            }
        default: return state;
    }
}

export default reducerUserInfo;