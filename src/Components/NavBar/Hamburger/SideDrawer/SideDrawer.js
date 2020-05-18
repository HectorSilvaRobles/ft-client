import React, {useState} from 'react';
import {NavLink, Redirect, useHistory} from 'react-router-dom';
import './sidedrawer.css'
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser} from '../../../../Redux/actions/coach_user_actions'

export default function SideDrawer(props){
    const user = useSelector(state => state.coach_user)
    const [redirect, setRedirect] =  useState(false);
    let history = useHistory();
    const dispatch = useDispatch()

    let drawerClasses = 'drawer'
    if(props.show){
        drawerClasses = 'drawer open';
    }
 
    // Logout user when they click the logout button
    const handleLogout = () => {
        dispatch(logoutUser()).then(res => {
            if(res.payload.success === true){
                history.push('/login')
            } else {
                alert('Logout Failed')
            }
        })
    }


    // Redirect user to login page when they click login button
    const toLoginPage = () => {
        setRedirect(true)
        setTimeout(() => {
            setRedirect(false)
        }, 1000)
    }

    if(user.userData && !user.userData.isAuth){
        return (
            <div className={drawerClasses}>
                <NavLink exact to ='/' activeStyle={{color: 'red'}} >Home</NavLink>
                <NavLink exact to ='/athletes' activeStyle={{color: 'red'}} >Athletes</NavLink>
                {/* <NavLink exact to ='/coaches' activeStyle={{color: 'red'}} >Coaches</NavLink> */}
                <button onClick={toLoginPage} >Login</button>
                {redirect ? <Redirect to='/login' /> : null}
            </div>
        )
    } else {
        return (
            <div className={drawerClasses}>
                <NavLink exact to ='/' activeStyle={{color: 'red'}} >Home</NavLink>
                <NavLink exact to ='/athletes' activeStyle={{color: 'red'}} >Athletes</NavLink>
                {/* <NavLink exact to ='/coaches' activeStyle={{color: 'red'}} >Coaches</NavLink> */}
                <NavLink exact to ='/coach-dashboard' activeStyle={{color: 'red'}} >Dashboard</NavLink>
                <button onClick={() => handleLogout()}>Logout</button>
            </div>
        )
    }
}