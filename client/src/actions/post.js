import axios from 'axios'
import { setAlert } from './alert';
import { DELETE_LIKES, GET_POSTS, POST_ERRORS, UPDATE_LIKES, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from './Types';

export const getPosts = () => async dispatch =>{
    try {
        const res=await axios.get('/api/posts/');
        dispatch({
            type:GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERRORS,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
    }
}

export const addLike = (id) => async dispatch =>{
    try {
        const res=await axios.put(`/api/posts/like/${id}`);
        dispatch({
            type:UPDATE_LIKES,
            payload: {id, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERRORS,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
    }
}


export const removeLike = (id) => async dispatch =>{
    try {
        const res=await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type:UPDATE_LIKES,
            payload: {id, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERRORS,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
    }
}

export const deletePost = (id) => async dispatch =>{
    try {
        const res=await axios.delete(`/api/posts/${id}`);
        dispatch({
            type:DELETE_LIKES,
            payload: id
        })
        dispatch(setAlert('Post has been deleted','success'))
    } catch (err) {
        dispatch({
            type: POST_ERRORS,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
    }
}

export const addPost = FormData => async dispatch =>{
    const config={
        headers: {
            'Content-Type':'application/json'
        }
    }
    try {
        const res=await axios.post(`/api/posts`,FormData, config);
        dispatch({
            type:ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post has been Added','success'))
    } catch (err) {
        dispatch({
            type: POST_ERRORS,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
    }
}

export const getPost = (id) => async dispatch =>{
    try {
        const res=await axios.get(`/api/posts/${id}`);
        dispatch({
            type:GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERRORS,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
    }
}


export const addComment = (postId, FormData) => async dispatch =>{
    const config={
        headers: {
            'Content-Type':'application/json'
        }
    }
    try {
        const res=await axios.post(`/api/posts/comment/${postId}`,FormData, config);
        dispatch({
            type:ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment has been Added','success'))
    } catch (err) {
        dispatch({
            type: POST_ERRORS,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
    }
}

export const deleteComment = (postId, commentId) => async dispatch =>{
    try {
        const res=await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type:REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert('Comment Removed','success'))
    } catch (err) {
        dispatch({
            type: POST_ERRORS,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
    }
}