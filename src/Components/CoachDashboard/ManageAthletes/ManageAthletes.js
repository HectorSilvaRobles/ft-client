import React, { Component } from 'react'
import AddAthleteModal from './Modals/AddAthleteModal'
import RemoveAthleteModal from './Modals/RemoveAthleteModal'
import './manageathlete.css'

export class ManageAthletes extends Component {
    render() {
        return (
            <div className='manage-athletes'>
                <AddAthleteModal />
                <RemoveAthleteModal />
            </div>
        )
    }
}

export default ManageAthletes
