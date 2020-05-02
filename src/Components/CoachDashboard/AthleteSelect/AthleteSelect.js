import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import './athleteselect.css'

function AthleteSelect(props) {
    const athletes = useSelector(state => state.athletes_reducer.athletes)
    const {callBack} = props;
    let athlete_select

    const handleSelect = (athlete) => {
        callBack(athlete._id)
    } 

    // Athlete select options
    if(athletes){
        const {all_Athletes} = athletes
        athlete_select = all_Athletes.map(val => {
            return (
                <div key={val._id} className='athlete-select-option'>
                        <input type="checkbox" onClick={() => handleSelect(val)} />
                        <h1>{val.firstname[0]}. {val.lastname}</h1>
                </div>
            )
        })
    }

    return (
        <div className='athlete-select-component'>
            <h1>Select Athlete</h1>
            <div className='athlete-select'>
                {athlete_select}
            </div>
        </div>
    )
}

export default AthleteSelect