import {combineReducers} from 'redux'
import authReducer from './authReducer'
import profileReducer from './authReducer'
import errorReducer from './errorReducer'
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
})