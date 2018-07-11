import axios from 'axios'
import {PROFILE_LOADING, GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_ERRORS} from './types'
export const getProfile  = dispatch => {
  return{
    getCurrentProfile: () => {
      dispatch(setProfileLoading())
      axios.get('/api/profile')
        .then(res => {
          dispatch({
            type: GET_PROFILE,
            payload: res.data
          })
        })
        .catch(err => {
          dispatch({
            type: GET_PROFILE,
            payload: {}
          })
        })
    }
  }
}

//Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

//Create profile
export const createProfile = (dispatch) => {
  return{
    onCreateProfile: (profileData, history) => {
      axios.post('/api/profile',  profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        })
    }
  }
}

//Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}