import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR, USER_LOADED, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, ACCOUNT_DELETED, EMAIL_SENT_SUCCESS, EMAIL_SENT_FAIL, PASSWORD_NOT_SET, SET_PASSWORD } from "../actions/Types";

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action){
 const {payload,type}=action;
 switch(type){
    case USER_LOADED:
        return{
            ...state,
            isAuthenticated:true,
            loading:false,
            user: payload
        }

    case EMAIL_SENT_SUCCESS:
        case EMAIL_SENT_FAIL:
        return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
        }
        
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
        localStorage.setItem('token',payload.token);
        return{
            ...state,
            ...payload,
            isAuthenticated:true,
            loading:false
        }
        case SET_PASSWORD:
            return{
                // ...state,
                ...payload,
                isAuthenticated: false,
                loading: false
            }
        case PASSWORD_NOT_SET:
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
        return{
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        }
        default:
            return state;
 }
}