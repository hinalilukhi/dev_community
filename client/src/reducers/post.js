import { DELETE_LIKES, GET_POSTS,GET_POST, POST_ERRORS, 
    UPDATE_LIKES, ADD_POST,
    ADD_COMMENT, REMOVE_COMMENT } from './../actions/Types';

const initialState={
    posts :[],
    post: null,
    loading : true,
    error: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action){
    const {type, payload} =action

    switch(type){
        case GET_POSTS:
            return{
                ...state,
                posts : payload,
                loading : false
            }
        case GET_POST:
            return{
                ...state,
                post: payload,
                loading: false
            }    
        case POST_ERRORS:
            return{
                ...state,
                error:payload,
                loading: false
            }
        case UPDATE_LIKES:
            return{
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? {
                    ...post,
                    likes: payload.likes
                }:post)
            }
        case DELETE_LIKES:
            return{
                ...state,
                posts: state.posts.filter(post =>post._id!==payload),//this will update the state, which will render the UI immediatly
                loading: false
            }
        case ADD_POST:
        return{
            ...state,
            posts: [payload, ...state.posts],
            loading: false
        }
        case ADD_COMMENT:
            return{
                ...state,
                post: {...state.post, comments: payload },
                loading: false
            }
        case REMOVE_COMMENT:
            return{
                ...state,
                post:{
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment.id !== payload)                    
                },
                loading: false
            }
            default:
                return state
    }
}