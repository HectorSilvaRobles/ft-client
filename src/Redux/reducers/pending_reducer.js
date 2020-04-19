import {GET_ALL_REQUESTS, SEND_REQUEST, REMOVE_REQUEST} from '../actions/types'

export default function(state = {}, action) {
    switch(action.type){
        case SEND_REQUEST:
            return {...state, new_request: action.payload}
        case GET_ALL_REQUESTS:
            return {...state, all_request: action.payload}
        case REMOVE_REQUEST: 
            return {...state, removed_request: action.payload}
        default: 
            return state;
    }
}