import React, {useState} from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {registerUser} from '../../Redux/actions/coach_user_actions';
import {useDispatch} from 'react-redux';
import {storage} from '../../firebaseConfig'
import {ProgressBar} from 'react-bootstrap'
import './registerPage.css'
import { toast } from 'react-toastify';

function RegisterPage(props){
    const dispatch = useDispatch();

     // Uploading a profile pic to firebase and getting back the URL to image

     const [picProgress, setPicProgress ] = useState(0)
     const [coachPic, setCoachPic] = useState(null)
     const [uploadError, setUploadError] = useState(null)

 
     const handleUploadChange = (event) => {
         const file = event.target.files[0]

         if(file){
             const fileType = file['type']
             const validFileType = ['image/jpeg', 'image/png']

             if(validFileType.includes(fileType)){
                 let fileCloudName = `${Math.random()}-${file.size}`;

                 const uploadCoachPic = storage.ref(`coaches/profilePics/${fileCloudName}`).put(file)

                 uploadCoachPic.on(
                     'state_changed',

                     snapshot => {
                         let uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

                        setPicProgress(uploadProgress)
                     },

                     error => setUploadError(error),

                     () => {
                         storage.ref('coaches/profilePics').child(fileCloudName).getDownloadURL()
                         .then(url => setCoachPic(url))
                     }
                 )
             }
         }
     }

    return (
        <Formik
            initialValues={{
                email: '',
                lastname: '',
                firstname: '',
                password: '',
                confirmPassword: '',
                profile_pic: '',
                accountRole: ''
            }}

            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        firstname: values.firstname,
                        lastname: values.lastname,
                        password: values.password,
                        profile_pic: coachPic,
                        accountRole: values.accountRole
                    };
                    if(!dataToSubmit.profile_pic){
                        toast.error('Please add a profile picture before submitting')
                    } else {
                        dispatch(registerUser(dataToSubmit)).then(res => {
                            if(res.payload.loginSuccess){
                                props.history.push('/')
                            } 
                            else if (res.payload.response.data.error.errmsg){
                                toast.error('Email has already been registered, Login or choose a different email')
                            }
                            else {
                                toast.error('Something went wrong...')
                            }
                        });
                        setSubmitting(false);
                    }
                }, 500)
            }}

            validationSchema={Yup.object().shape({
                email: Yup.string().email('Email is invalid, Please enter valid email').required('Email is required'),
                firstname: Yup.string().required('First name is required'),
                lastname: Yup.string().required('Last name is required'),
                password: Yup.string().min(6, 'Password must be atleast 6 characters').required('Password is required'),
                confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm password'),
                accountRole: Yup.string().required('Account role is required')
            })}
        >
        
        {props => {
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
            } = props;

            return (
                <div className='register'>
                    <div className='register-page'>
                        <div className='register-form'>
                            <div className='register-header'>
                                <h1>Register New Coach Account</h1>
                            </div>
                            <div className='reigster-body'>
                                <Form onSubmit={handleSubmit}>
                                <div className='profile-picture'>
                                    <div className='profile-pic-img'>
                                        <img src={coachPic ? coachPic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
                                    </div>
                                    {<ProgressBar now={picProgress} label={`${picProgress}`} className='upload-progress-bar-3' />}
                                    <label className='custom-file-upload-3'>
                                        <input type='file' onChange={(event) => handleUploadChange(event) }/>
                                        Upload Picture
                                    </label>
                                </div>
                                <div className='register-form-names'>
                                    <div className="register-form-group">
                                        <div className='register-form-group-title'>
                                            <h1>Firstname</h1>
                                            {touched.firstname && errors.firstname ? <h1 className='error-form'>*</h1> : null}
                                        </div>
                                        <Field 
                                            id="firstname" 
                                            type="text" 
                                            value={values.firstname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter Firstname" 
                                            className={'text-input-register'} 
                                        />
                                    </div>

                                    <div className="register-form-group">
                                        <div className='register-form-group-title'>
                                            <h1>Lastname</h1>
                                            {touched.lastname && errors.lastname ? <h1 className='error-form'>*</h1> : null}
                                        </div>
                                        <Field 
                                            id="lastname" 
                                            type="text" 
                                            value={values.lastname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter Lastname" 
                                            className={'text-input-register'} 
                                        />
                                    </div>
                                </div>
                                

                                <div className='register-form-names'>
                                    <div className="register-form-group">
                                        <div className='register-form-group-title'>
                                            <h1>Email</h1>
                                            {touched.email && errors.email ? <h1 className='error-form'>*</h1> : null}
                                        </div>
                                        <Field 
                                            id="email" 
                                            type="email" 
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter Email" 
                                            className={'text-input-register'} 
                                        />
                                    </div>

                                    <div className="register-form-group">
                                        <div className='register-form-group-title'>
                                            <h1>Account Role</h1>
                                            {touched.accountRole && errors.accountRole ? <h1 className='error-form'>*</h1> : null}
                                        </div>
                                        <Field 
                                            id="accountRole" 
                                            component="select"
                                            className="text-input-register"
                                            value={values.accountRole}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option value="">Select</option>
                                            <option value='Admin'>Admin</option>
                                            <option value="Regular">Regular</option>
                                        </Field>
                                    </div>
                                </div>

                                <div className='register-form-names'>
                                    <div className="register-form-group">
                                            <div className='register-form-group-title'>
                                                <h1>Create Password</h1>
                                                {touched.password && errors.password ? <h1 className='error-form'>*</h1> : null}
                                            </div>
                                            <Field 
                                                id="password" 
                                                type="password" 
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Create Password" 
                                                className={'text-input-register'} 
                                            />
                                    </div>
                                    <div className="register-form-group">
                                        <div className='register-form-group-title'>
                                                <h1>Confirm Password</h1>
                                                {touched.confirmPassword && errors.confirmPassword ? <h1 className='error-form'>*</h1> : null}
                                            </div>
                                        <Field 
                                            id="confirmPassword" 
                                            type="password" 
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Confirm Password" 
                                            className={'text-input-register'} 
                                        />
                                        
                                    </div>
                                </div>
                                <div className='form-submit-button'>
                                    <button type='submit'  >Submit</button>
                                </div>
                            </Form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }}
        </Formik>
    )
}

export default RegisterPage