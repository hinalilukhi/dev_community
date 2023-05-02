import axios from 'axios';
import { REGISTER_SUCCESS,
   REGISTER_FAIL,
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    LOGOUT,
    CLEAR_PROFILE,
    EMAIL_SENT_SUCCESS,
    EMAIL_SENT_FAIL,
    SET_PASSWORD,
    PASSWORD_NOT_SET  
  } from './Types';
import { setAlert } from './alert';
import setAuthToken from './../utills/setAuthToken';

export const loadUser =() => async dispatch =>{
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }

  try {
    const res= await axios.get('/api/auth');
     
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const register = ({name, email, password}) => async(dispatch) =>{
    const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
 const body = ({name, email, password});
  try {
    const res= await axios.post('/api/users',body,config);
    dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    })
    dispatch(loadUser())
  } catch (err) {
    const errors=err.response.data.errors;
    if(errors){
        errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
    }
    dispatch({
        type: REGISTER_FAIL
    })    
  }
}


export const login = (email, password) => async(dispatch) =>{
  const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
const body = JSON.stringify({ email, password});
try {
  const res= await axios.post('/api/auth',body,config);
  dispatch({
      type:LOGIN_SUCCESS,
      payload:res.data
  })
  dispatch(loadUser());
} catch (err) {
  const errors=err.response.data.errors;
  if(errors){
      errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
  }
  dispatch({
      type: LOGIN_FAIL
  })    
}
}

export const logout = () => (dispatch) =>{
  dispatch({
    type: LOGOUT
  })
  dispatch({
    type: CLEAR_PROFILE
  })
}

export const sendEmail = (email) => async(dispatch) =>{
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
const body = JSON.stringify({ email });
try {
const res= await axios.post('/api/password-reset',body,config);
dispatch({
    type:EMAIL_SENT_SUCCESS,
    payload:res.data
})
}catch(err){
    dispatch({
      type: EMAIL_SENT_FAIL
    })
}
}

export const setPassword = (userId, Token, password ) => async(dispatch) =>{
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ password });
try {

const res= await axios.post(`/api/password-reset/${userId}/${Token}`,body,config);
dispatch({
  type:SET_PASSWORD,
  payload:res.data
})
}catch(err){
    dispatch({
      type: PASSWORD_NOT_SET
    })
}
}