import axios from 'axios';
import {ALL_ATHLETES, ADD_ATHLETE, REMOVE_ATHLETE, UPDATE_ATHLETE} from './types'

const endpointUrl = 'http://ec2-3-101-59-77.us-west-1.compute.amazonaws.com'

export function getAllAthletes(){
    const request = axios.get('http://ec2-3-101-59-77.us-west-1.compute.amazonaws.com/api/athletes/all-athletes')
    .then(res => res.data)

    return {
        type: ALL_ATHLETES,
        payload: request
    }
}


export function addAthlete(dataToSubmit){
    const request = axios.post(`${endpointUrl}/api/athletes/add-athlete`, dataToSubmit)
    .then(res => res.data)
    .catch(err => err)

    return {
        type: ADD_ATHLETE,
        payload: request
    }
}


export function removeAthlete(athleteId){
    const request = axios.delete(`${endpointUrl}/api/athletes/remove-athlete/${athleteId}`)
    .then(res => res.data)
    .catch(err => err)

    return {
        type: REMOVE_ATHLETE,
        payload: request
    }
}