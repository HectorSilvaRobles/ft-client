import React, { Component } from 'react' 
import {Redirect} from 'react-router-dom'
import LoginSection from './LoginSection/LoginSection'
import logo from '../../Media/logo.png'
import logi from '../../Media/logi.png'

import {getAllRequest} from '../../Redux/actions/pending_actions'
import {connect} from 'react-redux'
require('./navbar.css' )

import SideDrawer from './Hamburger/SideDrawer/SideDrawer';
import Backdrop from './Hamburger/Backdrop/Backdrop';

import Notifications from './Notifications/Notifications'

export class NavBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            redirect: false,
            drawerOpen: false
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

    // For toggling hamburger menu
    drawerToggleClick = () => {
        this.setState((prevState) => {
            return {drawerOpen: !prevState.drawerOpen}
        })
    }
    backdropClick = () => {
        this.setState({drawerOpen: false})
    }

    render() {
        let accRole
        if(this.props.coach_user.userData){
            const {accountRole} = this.props.coach_user.userData
            accRole = accountRole
        }

        let backdrop;
        if(this.state.drawerOpen){
            backdrop = <Backdrop click={this.backdropClick} />
        }

        return (    
            <div className='navbar'>
                {this.state.redirect ? <Redirect to='/' /> : null}
                <div className='nav-logo'>
                    <img src={logo} alt='futbol training logo' onClick={() => this.toHomePage()} className='reg-logo' />
                    <img src={logi} alt='futbol training mobile logo' onClick={() => this.toHomePage()} className='mobile-logo' />

                </div>
                <div className='navbar_links'>
                    {accRole =='Admin' ? <LoginSection notification={<Notifications />} drawerclick={this.drawerToggleClick} /> : <LoginSection drawerclick={this.drawerToggleClick} />}
                    <SideDrawer show={this.state.drawerOpen} />
                    {backdrop}
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
