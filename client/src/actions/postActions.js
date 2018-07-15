import axios from 'axios'
import { GET_ERRORS, ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST  } from './types'

//Add Post
export const addPost = (dispatch) => {
  return{
    onAddPost: (postData) => {
      axios.post('/api/posts',  postData)
        .then(res => {
          dispatch({
            type: ADD_POST,
            payload: res.data
          })
        })
        .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        })
    }
  }
}

//Delete Post
export const deletePost = (dispatch) => {
  return{
    onDeletePost: (id) => {
      axios.delete(`/api/posts/${id}`)
        .then(res => {
          dispatch({
            type: DELETE_POST,
            payload: id
          })
        })
        .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        })
    }
  }
}

//Like Post
export const addLike = (dispatch) => {
  return{
    onAddLike: (id) => {
      axios.post(`/api/posts/like/${id}`)
        .then(res => getPosts(dispatch))
        .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        })
    }
  }
}

//Remove Post
export const removeLike = (dispatch) => {
  return{
    onRemoveLike: (id) => {
      axios.delete(`/api/posts/unlike/${id}`)
        .then(res => getPosts(dispatch))
        .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        })
    }
  }
}

//Get Posts
export const getPosts = (dispatch) => {
  return{
    onGetPosts: () => {
      dispatch(setPostLoading())
      axios.get('/api/posts')
        .then(res => {
          dispatch({
            type: GET_POSTS,
            payload: res.data
          })
        })
        .catch(err => {
          dispatch({
            type: GET_POSTS,
            payload: null
          })
        })
    }
  }
}

export const setPostLoading = () => {
  return{
    type: POST_LOADING,

  }
}