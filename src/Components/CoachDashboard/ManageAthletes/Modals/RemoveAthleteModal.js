import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {removeAthlete, getAllAthletes} from '../../../../Redux/actions/athlete_actions'

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
                    // update state at all_athletes
                    dispatch(getAllAthletes())
                    // Close the modal
                    handleClose()
                })
            })
        }
    }

    if(athletes){
        const {all_Athletes} = athletes;
        athlete_select = all_Athletes.map((val) => {
            return (
                <div key={val._id}>
                    <div>
                        <input type='checkbox' onClick={() => handleSelect(val)} />
                        <h1>{val.firstname} {val.lastname}</h1>
                    </div>
                </div>
            )
        })
    }
    return (
        <div>
            <button onClick={handleShow}>Remove Athlete</button>
            <Modal show={show} onHide={handleClose} scrollable={true}>
                <Modal.Header>
                    <Modal.Title>Remove Athlete</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {athlete_select} 
                    <button onClick={() => handleSubmit() }>Submit</button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default RemoveAthleteModal
