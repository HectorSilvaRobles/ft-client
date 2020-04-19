import {CREATE_COACH_POST, CREATE_PERFORMANCE_LOG, UPLOAD_HIGHLIGHT, DELETE_COACH_POST} from '../actions/types'

export default function(state = {}, action){
    switch(action.type){
        case CREATE_COACH_POST:
            return {...state, coach_post: action.payload}
        case CREATE_PERFORMANCE_LOG:
            return {...state, performance_log: action.payload}
        case UPLOAD_HIGHLIGHT :
            return {...state, highlight: action.payload}
        case DELETE_COACH_POST :
            return {...state, deletedPost: action.payload}
        default: 
            return state;
    }
}