import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import './athletepage.css'
import { Redirect } from 'react-router-dom'
import {Spinner} from 'react-bootstrap'

function AthletesPage(props) {
    const athletes = useSelector(state => { 
        return state.athletes_reducer.athletes
    })

    // Redirect to specific athlete profile page
    const [redirect, setRedirect] = useState(false)
    const [athlete, setAthlete] = useState('');

    const handleRedirect = (id) => {
        setAthlete(id)
        setRedirect(true)
    }

    if(athletes){
        const {all_Athletes} = athletes

        // athlete cards that will display each athletes name, picture, position, with a 'view profile' button
        var athleteCards = all_Athletes.map((val, index) => {
            return (
                <div key={index} className='athlete-card'>
                    <img src={val.athlete_pic} alt='athlete profile pic' />
                    <h1>{val.firstname} {val.lastname}</h1>
                    <h2>{val.position}</h2>
                    <button onClick={() => handleRedirect(val._id)}>View Profile</button>
                </div>
            )
        })
    } else {
        return (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )

    }

    return (
        <div className='athlete-page'>
            {redirect ? <Redirect to={`/athlete/${athlete}`} /> : null}
            <div className='athlete-card-layout'>
                {athleteCards}
            </div>
        </div>
    )
}

export default AthletesPage
