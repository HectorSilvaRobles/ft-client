import React from 'react'
import './togglebutton.css'

export default function ToggleButton(props) {
    console.log(props.click)
    return (
        <button className='toggle' onClick={props.click}>
            <div className='toggle-button'></div>
            <div className='toggle-button'></div>
            <div className='toggle-button'></div>
        </button>
    )
}