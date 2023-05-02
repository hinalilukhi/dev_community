import axios from 'axios'
import { setAlert } from './alert';

import { ACCOUNT_DELETED, CLEAR_PROFILE, GET_REPOS,GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE } from './Types';

export const getCurrentProfile=()=>async dispatch=>{
    try {
        const res= await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })        
    }
}

export const getProfiles = () => async dispatch =>{
    dispatch({ type : CLEAR_PROFILE})
    try {
        const res= await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })        
    }
}

export const getProfileById = userId => async dispatch =>{
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res= await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })        
    }
}

export const getGithubRepos = username => async dispatch =>{
    try {
        const res= await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })        
    }
}

export const createProfile=(formdata,history,edit=false)=>async dispatch=>{
try {
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const res=await axios.post('/api/profile', formdata,config);
    dispatch({
        type: GET_PROFILE,
        payload: res.data
    })
    dispatch(setAlert(edit ? 'profile created':'profile updated'))
    if(!edit){
        history.push('/dashboard');
    }
} catch (err) {
//     const errors=err.response.data.errors;
//   if(errors){
//      errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
//     }
    dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status}
    }) 
}
}

export const addExperiecne=(formdata, history)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res=await axios.put('/api/profile/experience', formdata,config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('profile updated','success'))
        history.push('/dashboard');
    } catch (err) {
        const errors=err.response.data.errors;
        if(errors){
         errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        }) 
    }
}

export const addEducation=(formdata, history)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res=await axios.put('/api/profile/education', formdata,config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        history.push('/dashboard');
        dispatch(setAlert('profile updated','success'))

    } catch (err) {
        const errors=err.response.data.errors;
        if(errors){
         errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        }) 
    }
}

export const deleteExperience = id => async dispatch =>{
    try {
        const res= await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience Removed','success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteEducation = id => async dispatch =>{
    try {
        const res= await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education Removed','success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteAccount =() => async dispatch =>{
    if(window.confirm('Are you sure you want to delete this account ? This can not be undo'))
    {
        try {
             await axios.delete(`/api/profile`);
            dispatch({
                type: CLEAR_PROFILE
            })
            dispatch({
                type: ACCOUNT_DELETED
            })
            dispatch(setAlert(' Your account has been removed','success'))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            })
        }
    }
    
}
