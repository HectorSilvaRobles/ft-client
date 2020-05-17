import React, { Component, createRef } from 'react'
import video from '../../Media/video.mp4'
import video2 from '../../Media/vid2.mp4'
import banner from '../../Media/banner.mp4'


import badge from '../../Media/badg.png'
import './homepage.css'
import {TweenMax} from 'gsap'
import ScrollMagic from 'scrollmagic'
import {ScrollMagicPluginGsap} from 'scrollmagic-plugin-gsap'
ScrollMagicPluginGsap(ScrollMagic, TweenMax)

export class Homepage extends Component {
    constructor(props){
        super(props)
        // Initialize scrollmagic
        this.controller = new ScrollMagic.Controller()
    }


    componentDidMount = () => {
        const video1 = document.getElementById('video-1')
        console.log(video1)
        // Intro section1 scene
        new ScrollMagic.Scene({
            duration: 500,
            triggerElement: `#section1`,
            triggerHook: 0
        })
        .setPin(`#section1`)
        .addTo(this.controller)

        // Intro section1 logo animation
        new ScrollMagic.Scene({
            duration: 1000,
            triggerElement: '#section1',
            triggerHook: 0
        })
        .setTween('#section1-div', {
            // opacity: 0,
            scale: .8,
            y: 100,
            opacity: 1
        })
        .addTo(this.controller)
        // Intro section1 text animation
        new ScrollMagic.Scene({
            duration: 1000,
            triggerElement: '#section1',
            triggerHook: 0
        })
        .setTween('#banner-info', {
            opacity: 0,
            scale: .8,
            y: -400
        })
        .addTo(this.controller)

         // Intro section1 video banner
         new ScrollMagic.Scene({
            duration: 1000,
            triggerElement: '#section1',
            triggerHook: 0
        })
        .setTween('#banner-video', {
            opacity: 0,
            scale: .8,
            y: -400
        })
        .addTo(this.controller)
        
        // Section 2 scene
        new ScrollMagic.Scene({
            duration: 3000,
            triggerElement: '#section2',
            triggerHook: 0
        })
        .setPin('#section2')
        .addTo(this.controller)

         // Section2 info scene h1-1
         new ScrollMagic.Scene({
            duration: 3000,
            triggerElement: '#section1-div',
            triggerHook: 0
        })
        .setTween('#sec2-h1-1', {
            y: -100,
            // x: 200,
            scale: 1.2,
            opacity: 1
        })
        .addTo(this.controller)

         // Section2 video scene
         new ScrollMagic.Scene({
            duration: 3000,
            triggerElement: '#section1-div',
            triggerHook: 0
        })
        .setTween('#video-sec2', {
            y: -200,
            // x: '50%',
            scale: 2,
            opacity: 1

        })
        .addTo(this.controller)
        


        // Section 3 scene
        new ScrollMagic.Scene({
            duration: 3000,
            triggerElement: '#section3',
            triggerHook: 0
        })
        .setPin('#section3')
        .addTo(this.controller)

         // Section3 info scene
         new ScrollMagic.Scene({
            duration: 3000,
            triggerElement: '#section3',
            triggerHook: 0
        })
        .setTween('#sec3-h1', {
            y: -200,
            x: 200,
            scale: 1.2,
            opacity: 1
        })
        .addTo(this.controller)

        // Section3 info scene mobile
        new ScrollMagic.Scene({
            duration: 3000,
            triggerElement: '#section3',
            triggerHook: 0
        })
        .setTween('#sec3-h1-mobile', {
            y: 50,
            x: 0,
            scale: 1,
            opacity: 1
        })
        .addTo(this.controller)

        // Section3 video scene
        new ScrollMagic.Scene({
            duration: 3000,
            triggerElement: '#section3',
            triggerHook: 0
        })
        .setTween('#sec3-vid', {
            y: -200,
            opacity: 1
        })
        .addTo(this.controller)
    }

    render() {
        return (
            <div className='homepage'>
                <div className='section1' id='section1' >
                    <div id='banner-info'>
                        <h1 className='banner-title'>AB Futbol Training</h1>
                        <h2 className='banner-small'>Working with clubs and athletes to train and improve skills essential to the game.</h2>
                        <h3 className='banner-scroll'>Scroll To Learn More</h3>
                    </div>
                    <div id='banner-video'>
                        <video src={banner} autoPlay={true} muted={true} loop={true} />
                    </div>
                    <div id='section1-div' >
                        <img id='section1-h1' src={badge} />
                    </div>
                </div>
                <div className='section2' id='section2'>
                    <div className='video-sec2' id='video-sec2'>
                        <video id='video-1' src={video} loop={true} autoPlay={true} />
                    </div>
                    <h1 id='sec2-h1-1'>We help athletes Improve their skills on the field</h1>
                </div>
                <div className='section3' id='section3'>
                    <h1 id='sec3-h1'>By individually working with each athlete, We create a unique training experience.</h1>
                    <h1 id='sec3-h1-mobile'>By individually working with each athlete, We create a unique training experience.</h1>
                    <div id='sec3-vid'>
                        <video id='video-2'  src={video2} loop={true} muted={true} autoPlay={true}   />
                    </div>
                </div>
                <div className='section4' id='section4'>

                </div>
            </div>
        )
    }
}

export default Homepage
