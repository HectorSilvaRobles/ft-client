import React, { useState } from 'react'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {Modal, ProgressBar} from 'react-bootstrap'
import {FaRegCalendarAlt} from 'react-icons/fa'
import {storage} from '../../../../firebaseConfig'
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux'
import './addathlete.css'
import DatePicker from 'react-datepicker'
import {addAthlete, getAllAthletes} from '../../../../Redux/actions/athlete_actions'

function AddAthleteModal(props){
    const dispatch = useDispatch();

    // Check to see if we added a new athlete successfully
    const [uploadSuccess, setUploadSuccess] = useState(false)


    // Modal handler for opening and closing modals
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // for selecting a date of birth
    const [startDate, setStartDate] = useState(null)
    const handleDOB = date => {
        setStartDate(date)
    }
    const CustomDatePick = ({value, onClick}) => (
        <FaRegCalendarAlt onClick={onClick} />
    )


    // Uploading athlete picture to firebase and getting back the URL to image
    const [picProgress, setPicProgress] = useState(0)
    const [athletePic, setAthletePic] = useState(null)
    const [uploadError, setUploadError] = useState(null)
 
    const handleUploadChange = (event) => {
        const file = event.target.files[0]
        
        if(file){
            const fileType = file['type']
            const validFileType = ['image/jpeg', 'image/png']

            if(validFileType.includes(fileType)){
                let fileCloudName = `${Math.random()}-${file.size}`;

                const uploadAthletePic = storage.ref(`athlete/profile-pic/${fileCloudName}`).put(file)

                uploadAthletePic.on(
                    'state_changed',

                    snapshot => {
                        let uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setPicProgress(uploadProgress)
                    },

                    error => setUploadError(error),

                    () => {
                        storage.ref('athlete/profile-pic').child(fileCloudName).getDownloadURL()
                        .then(url => setAthletePic(url) )
                    }
                )
            } else {
                setUploadError({uploadError: 'could not upload athlete profile picture'})
            }
        } 
    }
        return (
            <Formik
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        position: '',
                        dateOfBirth: '',
                        club: '',
                        athlete_pic: athletePic
                    }}

                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        setTimeout(() => {
                            let dataToSubmit = {
                                firstname: values.firstname,
                                lastname: values.lastname,
                                position: values.position,
                                dateOfBirth: startDate ? startDate.toDateString().split(' ').slice(1 ).join('-') : null,
                                club: values.club,
                                athlete_pic: athletePic
                            }
                            if(!dataToSubmit.athlete_pic || dataToSubmit.dateOfBirth == null){
                                setUploadError('Please add athlete picture')
                                toast.error('Please add a athlete picture and fill out form ')
                            } else {
                                dispatch(addAthlete(dataToSubmit)).then(res => {
                                    if(res.payload.success){
                                        setUploadSuccess(true)
                                        dispatch(getAllAthletes())
                                        toast.success(`Successfully added ${res.payload.new_athlete.firstname} ${res.payload.new_athlete.lastname}` )
                                    }
                                })
                                resetForm();
                                setSubmitting(false)
                            }
                        }, 500)
                    }}
                    
                    validationSchema={Yup.object().shape({
                        firstname: Yup.string().required('Athlete\'s first name is required'),
                        lastname: Yup.string().required('Athlete\'s last name is required'),
                        position: Yup.string().required('Athlete\'s position is required'),
                        club: Yup.string()
                        // dateOfBirth: Yup.string().required('Athlete\'s date of birth is required')
                        // athlete_pic: Yup.string().required('Athlete\'s picture is required')
                    })}
                >
                {props => {
                    const {values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props
                    // reset form after successfully adding athlete
                    const resetForm = () => {
                        setUploadSuccess(false)
                        setStartDate(null)
                        setAthletePic(null)
                        setPicProgress(0)
                        return;
                    }
                    
                    return (
                        <div>
                            <button className='athlete-modal-button' onClick={handleShow}>Add Athlete</button>
                            <Modal show={show} onHide={handleClose} size='lg' className='add-athlete-modal'>
                                <Modal.Header>
                                        <div className='add-athlete-modal-header'>
                                            <h1>Add Athlete</h1>
                                            <h2 onClick={handleClose}>X</h2>
                                        </div>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <div className='add-athlete-body'>
                                            <div className='form-group-athlete-pic'>
                                                <div className='athlete-pic-div'>
                                                    <div className='athlete-pic-img'>
                                                        <img src={athletePic ? athletePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' } alt='athlete-picture' />
                                                    </div>
                                                    {<ProgressBar now={picProgress} label={`${picProgress}`} className='upload-progress-bar-2' />}
                                                    <label className='custom-file-upload-2'>
                                                        <input type='file' onChange={(event) => handleUploadChange(event) }/>
                                                        Change Picture
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='form-group-form'>
                                                <div className='form-group-name'>
                                                    <div className="form-group fg-name">
                                                        <div className='form-label'>
                                                            <h1>Firstname</h1>
                                                            {errors.firstname ? <div className='input-error-feedback'>*</div> : null}
                                                        </div>
                                                        <Field 
                                                            id="firstname" 
                                                            type="text" 
                                                            value={values.firstname}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            placeholder="Enter First Name" 
                                                            className={
                                                                errors.firstname && touched.firstname ? 'text-input error' : 'text-input'
                                                            } 
                                                        />
                                                    </div>
                                                    <div className="form-group fg-name">
                                                        <div className='form-label'>
                                                            <h1>Lastname</h1>
                                                            {errors.lastname ? <div className='input-error-feedback'>*</div> : null}
                                                        </div>
                                                        <Field 
                                                            id="lastname" 
                                                            type="text" 
                                                            value={values.lastname}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            placeholder="Last Name" 
                                                            className={
                                                                errors.lastname && touched.lastname ? 'text-input error' : 'text-input'
                                                            } 
                                                        />
                                                        
                                                    </div>
                                                </div>


                                                <div className='form-group-other'>
                                                    <div className="form-group o-form">
                                                        <div className='form-label'>
                                                            <h1>Position</h1>
                                                            {errors.position ? <div className='input-error-feedback'>*</div> : null}
                                                        </div>
                                                        <Field 
                                                            id="position" 
                                                            component='select'
                                                            value={values.position}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            placeholder="Position" 
                                                            className={
                                                                errors.position && touched.position ? 'text-input error' : 'text-input'
                                                            } 
                                                        >
                                                            <option value=''>Select</option>
                                                            <option value='Forward'>Forward</option>
                                                            <option value='Midfielder'>Midfielder</option>
                                                            <option value='Defender'>Defender</option>
                                                            <option value='Goalie'>Goalie</option>
                                                            
                                                        </Field>
                                                    </div>

                                                    <div className='form-group o-form'>
                                                        <div className='form-label'>
                                                            <h1>Date Of Birth</h1>
                                                            <div className='input-error-feedback'>*</div>
                                                        </div>
                                                        <div className='date-of-birth'>
                                                            <DatePicker 
                                                                selected={startDate}
                                                                onChange={handleDOB}
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                className='date-picker'
                                                                dropdownMode="select"
                                                                scrollableYearDropdown
                                                                yearDropdownItemNumber={10}
                                                                placeholderText="Select a date"
                                                            />
                                                        </div>
                                                        
                                                            {/* <Field 
                                                                id="dateOfBirth" 
                                                                type="string" 
                                                                value={values.dateOfBirth}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur} 
                                                                placeholder={"Athlete's Club"}
                                                                className={
                                                                    errors.dateOfBirth && touched.dateOfBirth ? 'text-input error' : 'text-input'
                                                                } 
                                                            /> */}
                                                    </div>

                                                    <div className="form-group o-form">
                                                        <div className='form-label'>
                                                            <h1>Club</h1>
                                                            {errors.club ? <div className='input-error-feedback'>*</div> : null}
                                                        </div>
                                                        {/* <label htmlFor="age">Age</label> */}
                                                        
                                                        <Field 
                                                            id="club" 
                                                            type='string' 
                                                            value={values.club}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} 
                                                            placeholder={"Athlete's Club"}
                                                            className={
                                                                errors.club && touched.club ? 'text-input error' : 'text-input'
                                                            } 
                                                        />
                                                    </div>
                                                </div>
                                                <div className='form-group-buttons'>
                                                    
                                                    <button type="submit" >Save Changes</button>
                                                    {uploadSuccess ? resetForm() : null}
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </div>
                        )
                    }
                }
            </Formik>
        )
}

export default AddAthleteModal
