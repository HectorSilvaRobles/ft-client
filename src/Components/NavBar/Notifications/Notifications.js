import React, {useState} from 'react';
import {Modal, OverlayTrigger} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import './notifications.css'

import {createCoachPost, createPerformanceLog} from '../../../Redux/actions/coach_to_athlete_actions'
import {removeRequest, getAllRequest} from '../../../Redux/actions/pending_actions'

import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Popover from '@material-ui/core/Popover';
import {FaStar, FaTrashAlt} from 'react-icons/fa'


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

     // For Popover
     const [anchorEl, setAnchorEl] = useState(null);


     // Get data from redux state
     let requests = useSelector(state => state.pending_reducer.all_request);
     let athletes = useSelector(state => state.athletes_reducer.athletes)


     // Popover handle click
     const handleClick = (event) => {
         setAnchorEl(event.currentTarget)
     }
     const handlePopoverClose =() => {
         setAnchorEl(null);
     }
     const open = Boolean(anchorEl);
     const id = open ? 'simple-popover' : undefined


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
        // dispatch(removeRequest(request_id))
        // .then(res => {
        //     console.log(res)
        //     dispatch(getAllRequest())
        // })
    }

    let all_requests;
    let rejected = [];

    if(requests){
        const {all_pending_requests} = requests;

        // if there is no more pending requests then return this
        if(all_pending_requests.length === 0 ){
            all_requests = <div>No incoming requests</div>

        } else if(athletes){
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
                            // console.log(all_Athletes[i])
                        } 
                        // else {
                        //     rejectedRequest(val._id)
                        // }
                    }
                }
                const {firstname, lastname} = selected_athlete

                // Popover component to show the content of the request
                const popover = (
                    <Popover
                        id={id}
                        elevation={0}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                        }}
                    >
                    {val.typeOfEndpoint == 'createCoachPost' ? 
                            <div>
                                {val.dataToSubmit.coach_message}
                            </div>
                        : null}

                        {val.typeOfEndpoint  == 'createPerformanceLog' ? 
                        <div className='popover-content'>
                                <div className='performance-log-popover'>
                                    <div className='performance-log-popover-card'>
                                    <h1>Energy</h1>
                                                <div>
                                                
                                                    {[...Array(5)].map((value, index) => {
                                                        return (
                                                            <FaStar
                                                                size={35}
                                                                key={index}
                                                                color={val.dataToSubmit.energy_rating >= index ? '#C13540' : 'black'}
                                                                className='rating-star-red' 
                                                            />

                                                        )
                                                    })}
                                                </div>
                                    </div>
                                    <div className='performance-log-popover-card'>
                                    <h1>Focus</h1>
                                                <div>
                                                    {[...Array(5)].map((value, index) => {
                                                        return (
                                                            <FaStar
                                                                size={35}
                                                                key={index}
                                                                color={val.dataToSubmit.focus_rating >= index ? '#C13540' : 'black'}
                                                                className='rating-star-red' 
                                                            />

                                                        )
                                                    })}
                                                </div>
                                    </div>
                                    <div className='performance-log-popover-card'>
                                    <h1>Leadership</h1>
                                                <div>
                                                    {[...Array(5)].map((value, index) => {
                                                        return (
                                                            <FaStar
                                                                size={35}
                                                                key={index}
                                                                color={val.dataToSubmit.leadership_rating >= index ? '#C13540' : 'black'}
                                                                className='rating-star-red' 
                                                            />

                                                        )
                                                    })}
                                                </div>
                                    </div>
                                </div>
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
                            <div className='n-c-i-body'>
                                {val.typeOfEndpoint == 'createCoachPost' ? <h1>Type: Coach Post</h1> : null}
                                {val.typeOfEndpoint == 'createPerformanceLog' ? <h1>Type: Performance Log</h1> : null}
                                <h1>Athlete: {firstname[0] + '. ' + lastname}</h1>
                                <button className='review-requests' onClick={handleClick}>View Request</button>
                                {popover}
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
            <Badge badgeContent={requests ? requests.all_pending_requests.length : 0} color='error'>
                <MailIcon onClick={handleShow} fontSize='large' style={{color: 'white'}} className='not-icon' />
            </Badge>
            <Modal 
                show={show} 
                onHide={handleClose} 
                dialogClassName={"notification-modal"}
                scrollable={true}
                centered={true}
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title><div className='pending-header'>Pending Requests</div></Modal.Title>
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