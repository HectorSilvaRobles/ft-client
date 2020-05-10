import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux';
import {removeAthlete, getAllAthletes} from '../../../../Redux/actions/athlete_actions'
import './removeAthlete.css'

function RemoveAthleteModal(props) {
    // Modal handler for opening and closing modals
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const athletes = useSelector(state => state.athletes_reducer.athletes)

    let athlete_select
    let athletes_to_remove = []

    const handleSelect = (athlete) => {
        if(!athletes_to_remove.includes(athlete._id)){
            athletes_to_remove.push(athlete._id)
        } else {
            athletes_to_remove = athletes_to_remove.filter(e => e !== athlete._id)
        }
    }

    const handleSubmit = () => {
        if(athletes_to_remove.length > 0){
            athletes_to_remove.map(val => {
                dispatch(removeAthlete(val)).then(res => {
                    if(res.payload.success){
                        // update state at all_athletes
                        dispatch(getAllAthletes())

                        toast.success('Successfully removed selected atheletes')
                        // Close the modal
                        handleClose()
                    } else {
                        toast.error('There was a problem with removing selected athlete')
                    }
                    
                })
            })
        }
    }

    if(athletes){
        const {all_Athletes} = athletes;
        athlete_select = all_Athletes.map((val) => {
            return (
                <div key={val._id} className='each-athlete'>
                    <input type='checkbox' onClick={() => handleSelect(val)} />
                    <h1>{val.firstname[0]}. {val.lastname}</h1>
                </div>
            )
        })
    }
    return (
        <div >
            <button className='athlete-modal-button' onClick={handleShow}>Remove Athlete</button>
            <Modal show={show} onHide={handleClose} scrollable={true} size='lg'>
                <Modal.Header>
                        <div className='add-athlete-modal-header'>
                            <h1>Remove Athlete</h1>
                            <h2 onClick={handleClose}>X</h2>
                        </div>
                </Modal.Header>
                <Modal.Body >
                    <div className='remove-body'>
                        <div className='remove-selection'>
                            {athlete_select} 
                        </div>
                        <div className='remove-buttons'>
                            <button onClick={() => handleSubmit() }>Submit</button>
                        </div>
                    </div>
                    
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default RemoveAthleteModal
