import React, {Component} from 'react'
import {connect} from 'react-redux';
import './performance.css'
import Rating from './Ratings/Ratings'
import {createPerformanceLog} from '../../../Redux/actions/coach_to_athlete_actions'
import {sendRequest, getAllRequest} from '../../../Redux/actions/pending_actions'
 
import AthleteSelect from '../AthleteSelect/AthleteSelect'

class PerformanceLogs extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedAthletes : [],
            energy_rating: null,
            focus_rating: null,
            leadership_rating: null,
            postSuccess: false,
            ratingReset: false
        }
    }


     // Add selected athlete to state 
    callBackSelectedAthletes = (athlete_id) => {
        if(!this.state.selectedAthletes.includes(athlete_id)){
            var joined = this.state.selectedAthletes.concat(athlete_id)
            this.setState({selectedAthletes: joined})
        } else {
            var remove = this.state.selectedAthletes.filter(e => e !== athlete_id)
            this.setState({selectedAthletes: remove})
        }  
    }


    // Get the rating for each specific type and set state
    callBackRating = (rating, type) => {
        if(type == 'energy') {
            this.setState({energy_rating : rating})
        }
        else if( type == 'focus') {
            this.setState({focus_rating: rating})
        }
        else if( type == 'leadership') {
            this.setState({leadership_rating: rating})
        }

    }


    handleSubmit = () => {
        const {createPerformanceLog} = this.props
        const {lastname, accountRole, profile_pic} = this.props.coach_user.userData
        const {energy_rating, focus_rating, leadership_rating, selectedAthletes} = this.state
        
        // Check to see if any of the inputs are empty if so let them know they have to fill it out
        if(!energy_rating || !focus_rating || !leadership_rating || selectedAthletes.length < 1){
            console.log('error')
        }
        else {
            this.state.selectedAthletes.map(val => {
                const dataToSubmit = {
                    "coach_writer": lastname,
                    "coach_profile_pic" : profile_pic,
                    "energy_rating" : energy_rating,
                    "focus_rating" : focus_rating,
                    "leadership_rating" : leadership_rating,
                    "athlete_id" : val,
                    'typeOfEndpoint' : 'createPerformanceLog'
                }

                // If coach user account role is admin it will post, if not it will send it to a pending list where an admin will confirm it
                if(accountRole == 'Admin') {
                    createPerformanceLog(dataToSubmit)
                    .then(res => {
                        if(res.payload.success){
                            this.setState({postSuccess: true})
                        }
                        this.props.getAllRequest()
                    })
                } else {
                    this.props.sendRequest(dataToSubmit)
                    .then(res => {
                        if(res.payload.success){
                            this.setState({postSuccess: true})
                            alert('Your post was successfully created. Now waiting for approval.')
                        }
                        this.props.getAllRequest()

                    })
                }
            })
        } 
    }


    handleReset = () => {
        var selectedAthletes = document.getElementsByTagName('input')

        for(var i = 0; i<selectedAthletes.length; i++){
            selectedAthletes[i].checked = false
        }

        setTimeout(() => {
            this.setState({
                selectedAthletes: [],
                focus_rating: null,
                leadership_rating: null,
                energy_rating: null,
                postSuccess: false,
                ratingReset: true
            })
        }, 500)
    }

    render(){
        const {userData} = this.props.coach_user
        
        return (
            <div>
                {userData ? 
                    <div className='performance-log-admin'>
                    {this.state.postSuccess ? this.handleReset() : null}
                        <div className='performance-log-rating'>
                            <div className='rating-card'>
                                <h1>Energy</h1>
                                {<Rating rating={this.callBackRating} ratingreset={this.state.ratingReset ? true : null} type='energy'/>}
                            </div>
                            <div className='rating-card'>
                                <h1>Focus</h1>
                                {<Rating rating={this.callBackRating} ratingreset={this.state.ratingReset ? true : null} type='focus' />}
                            </div>
                            <div className='rating-card'>
                                <h1>Leadership</h1>
                                {<Rating rating={this.callBackRating} ratingreset={this.state.ratingReset ? true : null} type='leadership' />}
                            </div>
                        </div>
                        <AthleteSelect callBack={this.callBackSelectedAthletes} />
                        <button onClick={() => this.handleSubmit()} className='rating-button'>Save Log</button>
                    </div> 
                    : 
                    <div>Loading</div>
                }
            </div>
        )
    }
}

const mapPropsToState = (reduxstate) => {
    return reduxstate
}

const reduxActions = {
    createPerformanceLog,
    sendRequest,
    getAllRequest
}


const myconnect = connect(mapPropsToState, reduxActions)

export default myconnect(PerformanceLogs)