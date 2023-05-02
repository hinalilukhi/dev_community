import { CLEAR_PROFILE, GET_PROFILE,PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED, GET_PROFILES, GET_REPOS } from "../actions/Types";


const initialState = {
    profile:null,
    profiles:[],
    repos:[],
    loading:true,
    error:{}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return{
                ...state,
                profile: payload,
                loading: false
            };
        case GET_PROFILES:
            return{
                ...state,
                profiles: payload,
                loading: false
            }    
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            };  
        case ACCOUNT_DELETED:
        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                repos:[],
                loading:false
       
            } 
        case GET_REPOS:
            return{
                ...state,
                repos: payload,
                loading: false
            }
        default: 
        return state;
    }
}    

