import React, {useState} from 'react'
import {withRouter} from 'react-router-dom';
import {loginUser} from '../../Redux/actions/coach_user_actions'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';

function LoginPage(props) {
    const dispatch = useDispatch()

    const [formErrorMessage, setFormErrorMessage ] = useState('')

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
                                setFormErrorMessage('Check your email or password again')
                            }
                        })
                        .catch(err => {
                            setFormErrorMessage('Error Logging in. Check your email or password');
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
                    <div className='login-page'>
                        <h1>Login</h1>
                        <Form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field 
                                    id="email" 
                                    type="email" 
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Your Email" 
                                    className={
                                        errors.email && touched.email ? 'text-input error' : 'text-input'
                                    } 
                                />
                                {touched.email && errors.email && (
                                    <div className='input-error-feedback'>{errors.email}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field 
                                    id="password" 
                                    type="password" 
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Your Password" 
                                    className={
                                        errors.password && touched.password ? 'text-input error' : 'text-input'
                                    } 
                                />
                                {touched.password && errors.password && (
                                    <div className='input-error-feedback'>{errors.password}</div>
                                )}
                            </div>

                            {formErrorMessage && (
                                <label>
                                    <p style={
                                        {
                                            color: '#ff000bf', 
                                            fontSize: '0.7rem', 
                                            border: '1px solid', 
                                            padding: '1rem', 
                                            borderRadius: '10px'}
                                        }>
                                        {formErrorMessage}
                                    </p>
                                </label>
                            )}
                            
                            <div> 
                                <a></a>
                                <div>
                                    <button type='primary' htmlFor='submit' disabled={isSubmitting} onSubmit={handleSubmit}>Log In</button>
                                </div>
                                Or <a>Register Now</a>

                            </div>


                        </Form>
                    </div>
                )
            }}

            </Formik>
    )
}


export default withRouter(LoginPage);