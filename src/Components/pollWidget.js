/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../poll.css'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const PollWidget = ({ id }) => {

    const [ poll, setPoll ] = useState()
    const [ responses, setResponses ] = useState()
    const [ cookieState, setCookieState ] = useState( cookies.get(`poll${ id }`) ? cookies.get(`poll${ id }`) : null )
    const [ pollImage, setPollImage ] = useState()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DATABASE_URL}/polls/${ id }`)
            .then( res => { 
                setPoll( res.data ) 
            })
    },[ id ])

    useEffect(() => {
        getPollResponses()
    }, [ poll, cookieState ])

    const handlePollChoice = ( e ) => {
        axios.put(`${process.env.REACT_APP_DATABASE_URL}/polls/${ id }`, {...poll, responses: [ ...poll.responses, e ]})
            .then( res => setPoll( res.data ))
        cookies.set(`poll${ id }`, `${ e }`)
        setCookieState( cookies.get(`poll${ id }`))
        getPollResponses()
    }

    const getPollResponses = async () => {
        let pollResponses
        if( poll ){
            pollResponses = poll.choices.map((choice) => {
                let percentage = poll.responses.filter(response => response === choice).length / poll.responses.length * 100
                return {...responses, 'choice': choice, 'percentage': percentage, 'total': poll.responses.filter(response => response === choice).length}
            })
        }
        setResponses( pollResponses )

    }
    
    let responsesToDisplay
    if( responses ){
        responsesToDisplay = responses.map((response, index) => {
            let classExtension = response.choice === cookieState ? 'your-response' : 'other'
            let responseColour = response.choice === cookieState ? 'rgba(69, 197, 69, 0.705)' : 'rgba(0, 0, 0, 0.2)'
            return(
                // eslint-disable-next-line quotes
                <div key={index} style={{ background: `linear-gradient(90deg, ${ responseColour } ${ response.percentage }%, white ${ response.percentage }%)`}}  
                    className={'poll-result ' + classExtension}> 
                    <span>{ response.choice }</span> 
                    <span>{ response.percentage }%</span>
                    <span>{ (`${response.total}/${poll.responses.length}`) } votes</span>
                </div>
            )
        })
    }
    

    const pollChoices = poll ? poll.choices.map(( poll, index ) => {
        return(
            <div key={ index } onClick={ ( ) => handlePollChoice( poll ) } value={ poll } className="poll-choice"> { poll } </div>
        )
    }) : null

    // add env here
    const backgroundImg = poll ? poll.imgID ?
        axios.get(`${process.env.REACT_APP_DATABASE_URL}/images/${poll.imgID}`)
            .then( res => setPollImage(res.data.image)) : null : null

    if( !pollImage ){
        return(
            <div id="loading-container">
                <h1>...loading quiz now...</h1>
            </div>
        )
    }
    return(
        <div id="poll-wrapper">
            <div id="image-title-wrapper">
                <h1> { poll && poll.pollName } </h1>
                <img id="poll-image" height="10px" width="10px" src={`data:image/png;base64,${pollImage}`} />
            </div>
            { cookieState ? responsesToDisplay : pollChoices }
        </div>
    )

}
export default PollWidget