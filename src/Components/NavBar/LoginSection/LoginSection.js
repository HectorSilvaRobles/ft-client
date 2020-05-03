import React, {useState} from 'react';
import {withRouter, Redirect, NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios'
import ToggleButton from '../Hamburger/Togglebutton/ToggleButton'

const endpointUrl = 'http://ec2-3-101-59-77.us-west-1.compute.amazonaws.com'


function LoginSection(props){
    const user = useSelector(state => state.coach_user)
    const [redirect, setRedirect] =  useState(false);

    const logoutHandler = () => {
        axios.get(`${endpointUrl}/api/coach-users/logout`).then(res => {
            if(res.status === 200){
                props.history.push('/')
            } else {
                alert('Logout Failed')
            }
        })
    }

    const toLoginPage = () => {
        setRedirect(true)
        setTimeout(() => {
            setRedirect(false)
        }, 1000)
    }


    if(user.userData && !user.userData.isAuth){
        return (
            <div className='navbar_real'>
                <div className='nav-links'>
                        <NavLink exact to='/' className='navlink' activeStyle={{color: 'red'}}>Home</NavLink>
                        <NavLink exact to='/athletes' className='navlink' activeStyle={{color: 'red'}}>Athletes</NavLink>
                        <NavLink exact to='/coaches' className='navlink' activeStyle={{color: 'red'}}>Coaches</NavLink>
                </div>
                <span className='togglebutton'>
                    <ToggleButton click={props.drawerclick} />
                </span>
                <div className='login-button'>
                    {redirect ? <Redirect to='/login' /> : null}
                    <button onClick={() => toLoginPage()} >Coach Login</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className='navbar_real'>
                <div className='nav-links'>
                        <NavLink exact to='/' className='navlink' activeStyle={{color: 'red'}}>Home</NavLink>
                        <NavLink exact to='/athletes' className='navlink' activeStyle={{color: 'red'}}>Athletes</NavLink>
                        <NavLink exact to='/coaches' className='navlink' activeStyle={{color: 'red'}}>Coaches</NavLink>
                        <NavLink exact to='/coach-dashboard' className='navlink' activeStyle={{color: 'red'}}>Dashboard</NavLink>
                </div>
                <div>
                    {props.notification}
                </div>
                <span className='togglebutton'>
                    <ToggleButton click={props.drawerclick} />
                </span>
                <div className='logout-button'>
                    <button onClick={logoutHandler}>Logout</button>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginSection)