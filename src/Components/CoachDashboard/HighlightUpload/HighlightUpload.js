import React, {useState} from 'react';
import './highlightupload.css'
import {FaPlus} from 'react-icons/fa'
import {storage} from '../../../firebaseConfig'
import {ProgressBar} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {uploadHighlight} from '../../../Redux/actions/coach_to_athlete_actions'
import 'react-toastify/dist/ReactToastify.css'
import ReactPlayer from 'react-player'
import AthleteSelect from '../AthleteSelect/AthleteSelect'


function HighlightUpload(props){
    const coach_user = useSelector(state => state.coach_user.userData)
    const dispatch = useDispatch()

    const [selectedAthletes, setSelectedAthletes ] = useState([])

    // video upload states
    const [error, setError] = useState(false)
    const [url, setUrl] = useState(null)
    const [progress, setProgress]= useState(0)
    const [uploadSuccess, setUploadSuccess] = useState(false)
   

    // make the square component act as a input with file type
    const squareAsInput = () => {
       document.getElementsByName('highlightupload')[0].click()
    }


    // For selected athletes 
    const callBackSelectedAthletes = (athlete_id) => {
        if(!selectedAthletes.includes(athlete_id)){
            var joined = selectedAthletes.concat(athlete_id)
            setSelectedAthletes(joined)
        } else {
            var remove = selectedAthletes.filter(e => e !== athlete_id)
            setSelectedAthletes(remove)
        }

    }


    // For uploading the video 
    let fileCloudName;
    const handleUploadChange = (event) => {
        const file = event.target.files[0]
        
        if(file){
            const filetype = file['type'];
            const validVideoFile = ['video/mp4']

            if(validVideoFile.includes(filetype)){
                fileCloudName = `${Math.random()}-${file.size}-${file.name}`
                const uploadVideo = storage.ref(`highlights/videos/${fileCloudName}`).put(file)
                uploadVideo.on(
                    'state_changed', 

                    snapshot => {
                        let uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        setProgress(uploadProgress)

                    },

                    error => setError(error),

                    () => {
                        storage.ref('highlights/videos').child(fileCloudName).getDownloadURL()
                        .then(url => setUrl(url))
                })
            } else {
                setError('error tyring to upload video')
            }
        }
    }



    const handleSubmit = () => {
        const {lastname, _id} = coach_user
        if(progress < 100 || !url){
            toast.error('Video must be fully uploaded')
        } else if(selectedAthletes.length == 0){
            toast.error('Please select an athlete')
        } else {
            selectedAthletes.map(val => {
                let dataToSubmit = {
                    athlete_id: val,
                    video_link : url,
                    coach_writer : lastname,
                    coach_id : _id,
                }

                dispatch(uploadHighlight(dataToSubmit)).then(res => {
                    if(res.payload.success){
                        setUploadSuccess(true)
                        toast.success('Successfully uploaded highlight video to athlete\'s page' )
                    }
                })
            })
        }
    }


    const handleReset = () => {
        var selectedAthletes = document.getElementsByTagName('input');
        
        for(var i = 0; i<selectedAthletes.length; i++){
            selectedAthletes[i].checked = false
        }

        setTimeout(() => {
            setUrl(null)
            setProgress(0)
            setUploadSuccess(false)
            setSelectedAthletes([])
        }, 500)

    }

    return (
        <div className='highlight-upload'>
             <div className='upload-video'>
             {uploadSuccess ? handleReset() : null}

                {url ?  
                <div className='video-container'>
                    <ReactPlayer className='react-player' url={url} controls={true} height='100%' width='100%' /> 
                </div> : 
                <div className='upload-video-square' onClick={() => squareAsInput()} >
                    <FaPlus size={90} color={'#707070'}/>
                </div> 
                }
                {<ProgressBar now={progress} label={`${progress}%`} className='upload-progress-bar'/>}
                <label className='custom-file-upload'>
                    <input type='file' onChange={handleUploadChange} name='highlightupload' />
                    Upload Video
                </label>
             </div>
             <AthleteSelect callBack={callBackSelectedAthletes} />
            <button className='rating-button' onClick={handleSubmit} >Upload Highlight</button>
        </div>
    )
}

export default HighlightUpload