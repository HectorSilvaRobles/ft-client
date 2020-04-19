import {ALL_ATHLETES, ADD_ATHLETE, REMOVE_ATHLETE, UPDATE_ATHLETE} from '../actions/types'

const initialState = {
    athletes: null,
    new_athlete: null,
    
}
export default function(state = initialState, action){
    switch(action.type){
        case ALL_ATHLETES:
            return {...state, athletes: action.payload}
        case ADD_ATHLETE:
            return {...state, new_athlete: action.payload}
        case REMOVE_ATHLETE:
            return {...state, removed_athlete: action.payload}
        case UPDATE_ATHLETE:
            return {...state, updated_athlete: action.payload}
        default:
            return state;
    }
}