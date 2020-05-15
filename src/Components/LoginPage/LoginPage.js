import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom';
import {loginUser} from '../../Redux/actions/coach_user_actions'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {FaEnvelope, FaLock} from 'react-icons/fa'
import './loginPage.css'

import {toast} from 'react-toastify'


function LoginPage(props) {
    const dispatch = useDispatch()

    const [formErrorMessage, setFormErrorMessage ] = useState(null)

    if(formErrorMessage){
        toast.error('Login Error. Check email and password are correct')
    }

    const initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : ''

    return (
            <Formik
                // initializing values for login form
                initialValues={{
                    email: initialEmail,
                    password: ''
                }}

                // validating the user's input in login form
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Please enter your email').required('Email is required'),
                    password: Yup.string().min(6, 'Password must be atleast 6 characters').required('Password is required')
                })}

                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                        let dataToSubmit ={
                            email: values.email,
                            password: values.password
                        };

                        // sending user input data to loginUser in redux
                        dispatch(loginUser(dataToSubmit))
                        .then(res => {
                            if(res.payload.loginSuccess){
                                props.history.push('/') 
                            } else {
                                setFormErrorMessage(true)
                            }
                        })
                        .catch(err => {
                            setFormErrorMessage(true);
                            setTimeout(() => {
                                setFormErrorMessage('')
                            }, 5000)
                        })
                        setSubmitting(false)
                    }, 500)
                }}
            >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;

                return (
                    <div className='login'>
                    <div className='login-page'>
                        <div className='login-header'>
                            <div className='login-header-div'>
                                <h1>AB Futbol Login</h1>
                                <h2>Access Coach Dashboard</h2>
                                
                            </div>
                        </div>
                        <div className='login-form'>
                        <Form onSubmit={handleSubmit}>
                            <div className="login-form-group">
                                <FaEnvelope className='form-icons' />
                                <Field 
                                    id="email" 
                                    type="email" 
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Your Email" 
                                    className={'text-input-login'} 
                                />
                                {errors.email && touched.email ? <h1 className='error-form'>*</h1> : null}
                            </div>

                            <div className="login-form-group">
                                <FaLock className='form-icons' />
                                <Field 
                                    id="password" 
                                    type="password" 
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Your Password" 
                                    className={'text-input-login'} 
                                />
                                {errors.password && touched.password ? <h1 className='error-form'>*</h1> : null}

                            </div>
                            <div className='login-form-button'> 
                                    <button type='primary' htmlFor='submit' disabled={isSubmitting} onSubmit={handleSubmit}>Login</button>
                            </div>
                        </Form>
                        </div>
                        
                    </div>
                    </div>
                )
            }}

            </Formik>
    )
}


export default withRouter(LoginPage);