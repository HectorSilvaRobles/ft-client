import React, { Component } from 'react'
import AddAthleteModal from './Modals/AddAthleteModal'
import RemoveAthleteModal from './Modals/RemoveAthleteModal'


export class ManageAthletes extends Component {
    render() {
        return (
            <div>
                <AddAthleteModal />
                <RemoveAthleteModal />
            </div>
        )
    }
}

export default ManageAthletes
