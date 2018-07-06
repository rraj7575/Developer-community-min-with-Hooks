//Register User
import axios from 'axios'
import {GET_ERRORS} from './types'
export const registerUser = useData => dispatch => {
  debugger
  axios.post('api/users/register', useData)
    .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}