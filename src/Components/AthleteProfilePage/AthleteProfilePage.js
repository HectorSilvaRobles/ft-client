import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getAllAthletes} from '../../Redux/actions/athlete_actions'
import {deleteCoachPost} from '../../Redux/actions/coach_to_athlete_actions'
import {Accordion} from 'react-bootstrap'
import {FaStar, FaTrashAlt, FaPlay, FaPause} from 'react-icons/fa'
import './athleteprofilepage.css'
import Slider from 'react-slick';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';


export class AthleteProfilePage extends Component {
    constructor(props) {
        super(props)
        this.vidRef = React.createRef()
        this.juiceRef = React.createRef()

        this.state = {
            athlete: null,
            coach_posts: true,
            all_coach_posts: [],
            performance_logs: false,
            highlights: false,
            highlightModal: false,
            highlightVideo: [],
            highlightPlay: false,
            reactSlider: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                 swipeToSlide: true,
                 center: true,
                className: 'profile-options-real',
                responsive: [

                    {
                      breakpoint: 900,
                      settings: {
                        slidesToShow: 2,
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 1,
                      }
                    }
                  ]
            }
        }
    }

    componentDidMount = ( ) => {
        const athlete_id = this.props.match.params.id
        const {getAllAthletes} = this.props
        getAllAthletes()
        .then(res => {
            let all_athletes = res.payload.all_Athletes
            all_athletes.map(val => {
                if(val._id == athlete_id){
                    this.setState({athlete: val, all_coach_posts: val.coach_posts})
                }
            })
        })
    }


    deleteFunctionality = (typeOfDelete, id) => {
        if(typeOfDelete == 'coach_post'){
            const dataToSubmit = {
                post_id: id,
                athlete_id: this.state.athlete._id
            }
            this.props.deleteCoachPost(dataToSubmit)
            .then(res => {
                if(res.payload.success && this.state.athlete){
                    const {coach_posts} = this.state.athlete
                    const updated_coach_posts = coach_posts.filter(post => post._id !== id)
                    this.setState({all_coach_posts: updated_coach_posts })
                }
            })
        }
    }



    ////////// NEEDS WORK TO BE DONE STILL ////////////
    reorderPosts = (reorderBy, typeOfPost) => {
        console.log(reorderBy)
        const {all_coach_posts} = this.state
        if(all_coach_posts){
            const monthsToNum = { 'Jan' : 1,'Feb' : 2,'Mar' : 3,'Apr' : 4,'May' : 5,'June' : 6,'July' : 7,'Aug' : 8,'Sep' : 9, 'Oct' : 10, 'Nov' : 11,'Dec' : 12 }
            
            let reordered = all_coach_posts.sort(function(a, b){
                a = a.date_of_post.split(' ')
                let intYear = parseInt(a[2])
                let intDay = parseInt(a[1])
                let intMonth = monthsToNum[a[0]]

                a[0] = intYear
                a[1] = intMonth
                a[2] = intDay
                a = a.join('')

                b = b.date_of_post.split(' ')
                let intYearB = parseInt(b[2])
                let intDayB = parseInt(b[1])
                let intMonthB = monthsToNum[b[0]]

                b[0] = intYearB
                b[1] = intMonthB
                b[2] = intDayB
                b = b.join('')

                if(reorderBy == 'Recent'){
                    return b- a
                } else if (reorderBy == 'Oldest'){
                    return a -b
                }
            })

            this.setState({all_coach_posts: reordered})
        }
    }


    // Render each of the athlete's Coach posts
    coachPosts = () => {
        const {all_coach_posts} = this.state
        if(all_coach_posts){
            let coach_posts_cards
            if(all_coach_posts.length > 0){
                coach_posts_cards = all_coach_posts.map((val) => {
                    const {coach_writer, coach_profile_pic, coach_message, type_of_post, date_of_post, coach_id} = val

                    return (
                        <div className='coach_posts_card' key={val._id}>
                            <div className='coach_posts_card_header'>
                                <img src={coach_profile_pic} />
                                <h1>Coach {coach_writer}</h1> 
                            </div>
                            <div className='coach_posts_card_content'>
                                <div className='cpcc_upper'>
                                    <h1>{type_of_post}</h1>
                                    <h2>{date_of_post}</h2>
                                </div>
                                <div className='cpcc_lower'>
                                    <p>{coach_message}</p>
                                </div>
                            </div>
                            {coach_id == this.props.coach_user.userData._id  && coach_id ? 
                                <div className='delete-option'>
                                <FaTrashAlt color='#C13540' onClick={() => this.deleteFunctionality('coach_post', val._id)} size={20} className='delete-icon' />
                                </div> 
                            : null 
                            }

                        </div>
                    )
                })
            } else {
                return (
                    <div className='empty-athlete'>
                        <h1>{this.state.athlete.firstname}'s Newsfeed</h1>
                        <h2>No coach posts available</h2>
                    </div>
                )
            }
            return (
                <div className='coach-posts'>
                    <h1>{this.state.athlete.firstname}'s Newsfeed</h1>
                    <select onChange={(e) => this.reorderPosts(e.target.value, 'coachPosts')}>
                        <option value='Recent'>Recent</option>
                        <option value='Oldest'>Oldest</option>

                    </select>
                            {/* <button onClick={() => this.reorderPosts() }>Button</button> */}
                    {coach_posts_cards}
                </div>
            )
        }
    }


    // Render all the performance logs
    performanceLogs =() => {
        const {athlete} = this.state
        return (
            <div className='performance-accordion-component'>
                <h1>{athlete.firstname}'s Performance</h1>
                {athlete.performance_logs.length > 0 ? 
                <Accordion defaultActiveKey={0}>
                    {athlete.performance_logs.map((val, index) => {
                            return (
                                <div className='performance-accordion' key={index}>
                                    <Accordion.Toggle eventKey={index} className='performance-accordion-header'>
                                        <h1>{val.date_of_post}</h1>
                                        <h2>By Coach {val.coach_writer}</h2>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={index}>
                                        <div className='performance-card-area'>
                                            <div className='performance-card'>
                                                <h1>Energy</h1>
                                                <div>
                                                    {[...Array(5)].map((value, index) => {
                                                        return (
                                                            <FaStar
                                                                size={45}
                                                                key={index}
                                                                color={val.energy_rating >= index ? '#C13540' : 'black'}
                                                                className='rating-star-read' 
                                                            />

                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div className='performance-card'>
                                                <h1>Focus</h1>
                                                <div>
                                                    {[...Array(5)].map((value, index) => {
                                                        return (
                                                            <FaStar
                                                                size={45}
                                                                key={index}
                                                                color={val.focus_rating >= index ? '#C13540' : 'black'}
                                                                className='rating-star-read' 
                                                            />

                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div className='performance-card'>
                                                <h1>Leadership</h1>
                                                <div>
                                                    {[...Array(5)].map((value, index) => {
                                                        return (
                                                            <FaStar
                                                                size={45}
                                                                key={index}
                                                                color={val.leadership_rating >= index ? '#C13540' : 'black'}
                                                                className='rating-star-read' 
                                                            />

                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Collapse>
                                </div>
                            )
                        })
                    }
                </Accordion>
                :
                <div className='empty-athlete'>
                    <h2>No perfomance logs available</h2>
                </div>
                }
            </div>
        )
    }


    highlightsRender = () => {
        const {athlete} = this.state

        return (
            <div className="highlight-area">
                <h1>{athlete.firstname}'s Highlights</h1>
                {athlete.highlights.length > 0 ?
                <div className='highlights-go-here'>
                    {athlete.highlights.map((val, index) => {
                        return (
                            <div className='highlight-container' key={index} >
                                <video 
                                    height='100%' 
                                    className='react-player' 
                                    width='100%' 
                                    preload='metadata'
                                    onClick={() => {
                                        this.setState({
                                            highlightModal: true,
                                            highlightVideo: val})
                                    }
                                }>
                                <source src={`${val.video_link}#t=0.5`} type='video/mp4' /></video>
                            </div>
                        )
                    })}
                 </div>
                : 
                <div className='empty-athlete'>
                        <h2>No highlights available</h2>
                </div>
                }
            </div>
        )
    }


    // Open highlight modal 
    handleModal = () => {
        const {highlightVideo} = this.state

        return (
            <Modal 
                open={this.state.highlightModal} 
                onClose={() => {
                    this.vidRef.current.pause()
                    this.setState({highlightModal: false, highlightPlay: false})}
                    }
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                >
                <div className='highlight-modal'>
                    <div className='video-real'></div>
                    <div className='video-info'> 
                        <video 
                            ref={this.vidRef}
                            className='real-video-player' 
                            src={highlightVideo.video_link}
                            type='video/mp4'
                         />
                         <div className='controls'>
                            <div className='video-buttons' onClick={() => {
                                if(this.vidRef.current){
                                    if(this.vidRef.current.paused){
                                        this.vidRef.current.play()
                                    } else {
                                        this.vidRef.current.pause()
                                    }
                                }
                                this.setState({highlightPlay: !this.state.highlightPlay})
                                }}>
                                <button 
                                    id='play-pause' 
                                >  
                                    {this.state.highlightPlay ? <FaPause /> : <FaPlay  />}
                                </button>
                            </div>
                         </div>
                    </div>
                </div>
            </Modal>
        )
    }


    handleDisplayAthlete =() => {
        const {athlete} = this.state

        return (
            <div className='athlete-profile'>
            {this.state.highlightModal ? this.handleModal() : null}
                <div className='profile-header'>
                    <div className='profile-header-image'>
                        <img src={athlete.athlete_pic} alt='athlete profile pic' />
                    </div>
                    <div className='profile-header-info'>
                        <h1>{athlete.firstname} {athlete.lastname}</h1>
                        <h2>Position: {athlete.position}</h2>
                        <h2>Age: {athlete.age}</h2>
                    </div>
                </div>
                <div className='profile-options'>
                    <Slider {...this.state.reactSlider} >
                        <button className={this.state.coach_posts ? 'profile-options-button-active':'profile-options-button'} onClick={() => this.setState({coach_posts: true, performance_logs: false, highlights: false})}>Newsfeed</button>
                        <button className={this.state.performance_logs ? 'profile-options-button-active':'profile-options-button'} onClick={() => this.setState({performance_logs: true, coach_posts: false, highlights: false})}>Performance</button>
                        <button className={this.state.highlights ? 'profile-options-button-active':'profile-options-button'} onClick={() => this.setState({highlights: true, performance_logs: false, coach_posts: false})}>Highlights</button>
                    </Slider>
                </div>

                <div className='profile-content-area'>
                    {this.state.coach_posts ? this.coachPosts() : null}
                    {this.state.performance_logs ? this.performanceLogs() : null}
                    {this.state.highlights ? this.highlightsRender() : null}
                </div>
            </div>
        )
    }

    render() {
        const {athlete, highlightPlay} = this.state
        
        return (
            <div className='athlete-profile-main'>
                {athlete ? this.handleDisplayAthlete() : null}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getAllAthletes, deleteCoachPost})(AthleteProfilePage)