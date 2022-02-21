import axios from 'axios'
import {PROFILE_LOADING, GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_PROFILES} from './types'

export const getProfile = dispatch => {
    return {
        getCurrentProfile: () => {
            dispatch(setProfileLoading())
            axios.get('/api/profile')
                .then(res => {
                    console.log(res.data)
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

export const getProfiles = dispatch => {
    return {
        getAllProfile: () => {
            dispatch(setProfileLoading())
            axios.get('/api/profile/all')
                .then(res => {
                    dispatch({
                        type: GET_PROFILES,
                        payload: res.data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: GET_PROFILES,
                        payload: null
                    })
                })
        }
    }
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

export const getProfileByHandle = dispatch => {
    return {
        onGetProfileByHandle: (handle) => {
            dispatch(setProfileLoading())
            axios.get(`/api/profile/handle/${handle}`)
                .then(res => {
                    dispatch({
                        type: GET_PROFILE,
                        payload: res.data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: GET_PROFILE,
                        payload: null
                    })
                })
        }
    }
}