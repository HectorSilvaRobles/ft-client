import React, { Component } from 'react' 
import {Redirect} from 'react-router-dom'
import LoginSection from './LoginSection/LoginSection'
import logo from '../../Media/logo.png'
import {getAllRequest} from '../../Redux/actions/pending_actions'
import {connect} from 'react-redux'
import './navbar.css'

import Notifications from './Notifications/Notifications'

export class NavBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            redirect: false,
        }
    }

    toHomePage = () => {
        this.setState({
            redirect: true
        })

        setTimeout(() => {
            this.setState({
                redirect: false
            })
        }, 1000)
    }

    render() {
        let accRole
        if(this.props.coach_user.userData){
            const {accountRole} = this.props.coach_user.userData
            accRole = accountRole
        }

        return (    
            <div className='navbar'>
                {this.state.redirect ? <Redirect to='/' /> : null}
                <div className='nav-logo'>
                    <img src={logo} alt='futbol training logo' onClick={() => this.toHomePage()} />
                </div>
                <div className='navbar_links'>
                    {accRole =='Admin' ? <LoginSection notification={<Notifications />} /> : <LoginSection />}
                </div>
            </div>
        )
    }
}

const mapPropsToState = (reduxState) => {
    return reduxState
}

const mapReduxToState = {
    getAllRequest
}

const myConnect = connect(mapPropsToState, mapReduxToState)

export default  myConnect(NavBar)
