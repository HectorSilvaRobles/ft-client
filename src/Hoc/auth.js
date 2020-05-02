import React, {useEffect} from 'react';
import {auth} from '../Redux/actions/coach_user_actions';
import {useSelector, useDispatch} from 'react-redux';

export default function(ComposedClass, reload, adminRoute=null){
    function AuthenticationCheck(props){
        let user = useSelector(state => state.coach_user)
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(async response => {
                if(await !response.payload.isAuth){
                    if(reload){
                        props.history.push('/login')
                    }
                } else {
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }
                    else {
                        if(reload === false){
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [dispatch, props.history, user.googleAuth])
        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}

