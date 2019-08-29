import axios from 'axios'
import { setAlert } from './alert'
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES, 
    DELETE_POST,
    ADD_POST, 
    EDIT_POST,
    GET_POST, 
    GET_COMMENTS,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT
} from './types'

//Get all posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/echelon/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//add post
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/echelon/posts', formData, config )
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Created', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//get post by id 
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/echelon/posts/${id}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//edit post by id 
export const editPost = id => async dispatch => {
    try {
        const res = await axios.patch(`/echelon/posts/${id}`)
        dispatch({
            type: EDIT_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//delete post by id
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/echelon/posts/${id}`)
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(setAlert('Post Removed', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//Add like to a post
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/echelon/posts/like/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//remove like to a post
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/echelon/posts/unlike/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//get all the comments 
export const getComments = (postId) => async dispatch => {
    try {
        const res = await axios.get('/echelon/posts/comment/:id')
        dispatch({
            type: GET_COMMENTS,
            payload: res.data 
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//add comment
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/echelon/posts/comment/${postId}`, formData, config )
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment Added', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//edit comment 
// export const editComment = (postId, commentId) => async dispatch => {
//     try {
//         await axios.patch(`/echelon/posts/comment/${postId}/${commentId}`)
//         dispatch({
//             type: EDIT_COMMENT,
//             payload: res.data
//         })
//     } catch (error) {
//         dispatch({
//             type: POST_ERROR,
//             payload: { msg: error.response.statusText, status: error.response.status }
//         })
//     }
// }

//delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/echelon/posts/comment/${postId}/${commentId}`)
        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert('Comment Removed', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
