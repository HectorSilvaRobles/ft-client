import axios from 'axios';
import {GET_ALL_REQUESTS, SEND_REQUEST, REMOVE_REQUEST} from './types'

const endpointUrl = process.env.REACT_APP_SERVER_API


export function getAllRequest(){
    const request = axios.get(`${endpointUrl}/api/pending/all-requests`)
    .then(res => res.data)

    return {
        type: GET_ALL_REQUESTS,
        payload: request
    }
}


export function sendRequest(dataToSubmit){
    const sendRequestToSchema = {
        coach_writer: dataToSubmit.coach_writer,
        coach_profile_pic : dataToSubmit.coach_profile_pic,
        dataToSubmit : dataToSubmit,
        typeOfEndpoint : dataToSubmit.typeOfEndpoint
    }

    const request = axios.post(`${endpointUrl}/api/pending/send-request`, sendRequestToSchema)
    .then(res => res.data)

    return {
        type: SEND_REQUEST,
        payload: request
    }
}



export function removeRequest(request_id){
    let request = axios.delete(`${endpointUrl}/api/pending/remove/${request_id}`)
    .then(res => res.data)
    .catch(err => err)

    return {
        type: REMOVE_REQUEST,
        payload: request
    }
}