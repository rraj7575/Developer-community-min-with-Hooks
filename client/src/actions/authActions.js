//Register User
import axios from 'axios'
import {SET_CURRENT_USER, GET_ERRORS} from './types'
import setAuthToken from './../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
export const registerUser = dispatch => {
  return{
    onSignUp: (userData, history) => {
      axios.post('/api/users/register', userData)
      .then(res => history.push('/login'))
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
    }
  }
}

export const loginUser = dispatch => {
  return {
    onLogin: userData => {
      axios.post('/api/users/login', userData)
        .then(res => {
          const {token} = res.data
          localStorage.setItem('jwtToken', token)
          //Set token to auth header
          setAuthToken(token)
          //Decode token to get user data
          const decodeUser = jwt_decode(token)
          dispatch(setCurrentUser(decodeUser))
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

//Set logedin user
export const setCurrentUser = userData => {
  return {
    type: SET_CURRENT_USER,
    payload: userData
  }
}

//
export const logoutUser = dispatch => {
  //Remove token from local storage
  return{
    onLogout: () => {
      localStorage.removeItem('jwtToken')
       //Remove auth header for future request
      setAuthToken(false)
      dispatch(setCurrentUser({}))
    }
  }
}

