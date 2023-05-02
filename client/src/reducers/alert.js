import { SET_ALERT, REMOVE_ALERT } from "../actions/Types";
 
const initialState={
    alertType:'',
    id:'',
    msg:''
};

export default function alert(state=initialState,action) {
    switch(action.type){
        case SET_ALERT:
        return {...state, id:action.payload.id, 
            msg:action.payload.msg,
             alertType: action.payload.alertType};
        case REMOVE_ALERT:
        return {
            id:'',
            msg:'',
            alertType:''
        }
        default:
        return state;
    }
}
