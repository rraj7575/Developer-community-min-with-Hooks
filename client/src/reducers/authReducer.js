import {SET_CURRENT_USER} from './../actions/types'
import isEmpty from './../validation/is-empty'

const initialState = {
    isAuthenticated: false,
    user: {}
}
export default function (state = initialState, action) {
    console.log('state', state)
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case 'DO_NOTHING':
            return state
        default:
            return state
    }
}