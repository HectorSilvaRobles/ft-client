import axios from 'axios';
import {LOGIN_USER, REGISTER_USER, LOGOUT_USER, AUTH_USER, UPDATE_USER} from './types'

const endpointUrl = 'http://ec2-3-101-59-77.us-west-1.compute.amazonaws.com'
axios.defaults.withCredentials = true;

export function registerUser(dataToSubmit){
    const request = axios.post(`${endpointUrl}/api/coach-users/register`, dataToSubmit)
    .then(res => res.data)
    .catch(err => err)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${endpointUrl}/api/coach-users/login`, dataToSubmit)
    .then(res => res.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}


export async function auth(){
    const request = await axios.get(`${endpointUrl}/api/coach-users/auth`, {withCredentials: true} )
    .then(res => res.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${endpointUrl}/api/coach-users/logout`)
    .then(res => res.data)

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function updateUser(dataToSubmit){
    // Create a new object with valid values
    let newObject = {}
    for(let [key, value] of Object.entries(dataToSubmit)){
        if(value !== '' && key !== 'coach_id'){
            newObject[key] = value
        }
    }

    let request = axios.put(`${endpointUrl}/api/coach-users/update-coach/${dataToSubmit.coach_id}`, newObject)
    .then(res => {return res.data})
    .catch(err => err)

    return {
        type: UPDATE_USER,
        payload: request
    }
    
}