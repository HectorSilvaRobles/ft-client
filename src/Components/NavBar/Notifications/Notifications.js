import React, {useState} from 'react';
import {Modal, Popover, OverlayTrigger} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import './notifications.css'

import {createCoachPost, createPerformanceLog} from '../../../Redux/actions/coach_to_athlete_actions'
import {removeRequest, getAllRequest} from '../../../Redux/actions/pending_actions'

import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

function Notifications(props){
    const dispatch = useDispatch()
    const classes = useStyles();

     // Modal handler for opening and closing modals
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);


     // Get data from redux state
     let requests = useSelector(state => state.pending_reducer.all_request);
     let athletes = useSelector(state => state.athletes_reducer.athletes)

     // If pending request is accepted 
     const acceptedRequest = (dataToSubmit, request_id, type_of_endpoint) => {
         
        // If type of endpoint is createCoachPost then run this
       if(type_of_endpoint == 'createCoachPost'){
           dispatch(createCoachPost(dataToSubmit))
           .then(res => {
               if(res.payload.success){
                   rejectedRequest(request_id)
               }
           })
       }
       // If type of endpoint is createPerformanceLog then run this
       if(type_of_endpoint == 'createPerformanceLog'){
           dispatch(createPerformanceLog(dataToSubmit))
           .then(res => {
               if(res.payload.success){
                   rejectedRequest(request_id)
               }
           })
       }
    }


    // If pending request is rejected
    const rejectedRequest = (request_id) => {
        dispatch(removeRequest(request_id))
        .then(res => {
            dispatch(getAllRequest())
        })
    }

    let all_requests;
    if(requests){
        const {all_pending_requests} = requests;

        // if there is no more pending requests then return this
        if(all_pending_requests.length === 0){
            all_requests = <div>No incoming requests</div>
        } else {
            let selected_athlete;
            const {all_Athletes} = athletes

            // loop through the array of pending requests and create requests cards
            all_requests = all_pending_requests.map(val => {
                // get the specific athlete
                let athlete_id = val.dataToSubmit.athlete_id

                if(all_Athletes){
                    for(let i =0; i < all_Athletes.length; i++){
                        const {_id} = all_Athletes[i]
                        if(_id == athlete_id){
                            selected_athlete = all_Athletes[i]
                        }
                    }
                }
                const {firstname, lastname} = selected_athlete

                // Popover component to show the content of the request
                const popover = (
                    <Popover>
                        {val.typeOfEndpoint == 'createCoachPost' ? 
                            <div>
                                <Popover.Content>{val.dataToSubmit.coach_message}</Popover.Content> 
                            </div>
                        : null}

                        {val.typeOfEndpoint  == 'createPerformanceLog' ? 
                        <div>
                            <Popover.Content>{val.dataToSubmit.energy_rating}</Popover.Content>
                        </div>
                        : null}
                    </Popover>
                )

                return (
                    <div key={val._id} className='notification-card'>
                        <div className='notification-card-header'>
                            <img src={val.coach_profile_pic} alt='coach profile picture' />
                            <h1>Coach {val.coach_writer}</h1>
                        </div>
                        <div className='notification-card-info'>
                            <div className='n-c-i-header'>
                                {val.typeOfEndpoint == 'createCoachPost' ? <h1>Coach Post</h1> : null}
                                {val.typeOfEndpoint == 'createPerformanceLog' ? <h1>Performance Log</h1> : null}

                            </div>
                            <div className='n-c-i-body'>
                                <h1>{firstname[0] + '. ' + lastname}</h1>

                                {val.typeOfEndpoint === 'createCoachPost' ? 
                                <div>
                                    <OverlayTrigger trigger='click' placement='bottom' overlay={popover}>
                                        <button>View Request</button>
                                    </OverlayTrigger> 
                                </div>
                                : null}

                                {val.typeOfEndpoint == 'createPerformanceLog' ? 
                                <div>
                                    <OverlayTrigger trigger='click' placement='bottom' overlay={popover}>
                                        <button>View Request</button>
                                    </OverlayTrigger> 
                                </div> 
                                : null}
                                
                            </div>
                        </div>
                        <div className='notification-card-buttons'>
                            <button className='not-button-accept' onClick={() => acceptedRequest(val.dataToSubmit, val._id, val.typeOfEndpoint)}>Accept</button>
                            <button className='not-button-reject' onClick={() => rejectedRequest(val._id)}>Reject</button>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <div className={`notification ${classes.root}`} >
            <Badge badgeContent={requests.all_pending_requests ? requests.all_pending_requests.length : 0} color='error'>
                <MailIcon onClick={handleShow} fontSize='large' style={{color: 'white'}} />
            </Badge>
            <Modal 
                show={show} 
                onHide={handleClose} 
                dialogClassName={"notification-modal"}
                scrollable={true}
                centered={true}
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title>Pending Requests</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className='notification-modal-body'>
                        {all_requests}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Notifications