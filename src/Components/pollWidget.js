/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../poll.css'
import Cookies from 'universal-cookie'
import CroppedImage from './croppedImage'
import { Helmet } from 'react-helmet-async'

const cookies = new Cookies()

const PollWidget = ({ id }) => {

    const [ poll, setPoll ] = useState()
    const [ totalVotes, setTotalVotes ] = useState(0)
    const [ responses, setResponses ] = useState()
    const [ cookieState, setCookieState ] = useState( cookies.get(`poll${ id }`) ? cookies.get(`poll${ id }`) : null )
    const [ pollImage, setPollImage ] = useState()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/polls/${ id }`)
            .then( res => {
                const r = res.data
                setPoll({...poll,
                    pollName: r.pollName,
                    pollAuthor: r.pollAuthor,
                    id: r.id,
                    responses: r.responses,
                    choices: r.choices,
                    imgID: r.imgID,
                    backgroundColour: r.backgroundColour,
                    croppedHeight: r.croppedHeight,
                    croppedWidth: r.croppedWidth,
                    croppedX: r.croppedX,
                    croppedY: r.croppedY
                })
            })
    },[ id ])

    useEffect(() => {
        getPollResponses()
    }, [ poll, cookieState ])

    const handlePollChoice = ( e, i ) => {

        let newResponses = [ ...poll.responses ]
        let newResponse = { ...newResponses[ i ], responseCount: newResponses[i].responseCount += 1, poll: { id }}
        newResponses[ i ] = newResponse
        axios.put(`${process.env.REACT_APP_SERVER_URL}/responses/${ e.id }`, newResponse )
            .then( res => {
                newResponses[ i ] = { 
                    response: res.data.response,
                    responseCount: res.data.responseCount,
                    id: res.data.id,
                    poll: { id: res.data.poll.id}
                }
                setPoll({ ...poll, responses: newResponses })
            })

        cookies.set(`poll${ id }`, `${ e.response }`)
        setCookieState( cookies.get(`poll${ id }`))
        getPollResponses()
    }

    const getPollResponses = async () => {
        let pollResponses
        if( poll ){
            let totalResponses = poll.responses.reduce(( a, b ) => a + b.responseCount, 0 )
            setTotalVotes( totalResponses )
            pollResponses = poll.responses.map(( response ) => {
                let percentage = response.responseCount / totalResponses * 100
                return { 'response': response.response, 'percentage': percentage ? percentage : 0, total: response.responseCount }
            })
        }
        setResponses( pollResponses )
    }
    
    let responsesToDisplay
    if( responses ){
        responsesToDisplay = responses.map(( response, index ) => {
            let classExtension = response.response === cookieState ? 'your-response' : 'other'
            let responseColour = response.response === cookieState ? 'rgba(69, 197, 69, 0.705)' : 'rgba(0, 0, 0, 0.2)'
            return(
                // eslint-disable-next-line quotes
                <div key={index} style={{ background: `linear-gradient(90deg, ${ responseColour } ${ response.percentage }%, white ${ response.percentage }%)`}}  
                    className={'poll-result ' + classExtension}> 
                    <span>{ response.response }</span> 
                    <span>{ response.percentage.toFixed(1) }%</span>
                    <span id="poll-votes">{ (`${response.total}/${ totalVotes }`) } votes</span>
                </div>
            )
        })
    }
    

    const pollChoices = poll ? poll.responses.map(( choice, index ) => {
        return(
            <div key={ index } onClick={ () => handlePollChoice( choice, index ) } value={ choice } className="poll-choice"> { choice.response } </div>
        )
    }) : null

    useEffect(() => {
        poll ? poll.imgID ?
            axios.get(`${process.env.REACT_APP_SERVER_URL}/images/${poll.imgID}`)
                .then( res => setPollImage(res.data.image)) : null : null
    }, [ poll ])

    if( !pollImage && !poll){
        return(
            <div id="loading-container">
                <h1>...loading quiz now...</h1>
            </div>
        )
    }
    return(
        <div id="poll-wrapper">
            <Helmet>
                <title>
                    Poll
                </title>
            </Helmet>
            <div style={ pollImage ? null : { backgroundColor: `rgba(${poll.backgroundColour})`, width: '100%', height: '40vh' } } id="image-title-wrapper">
                <h1> { poll && poll.pollName } </h1>
                { pollImage ? <CroppedImage 
                    imageSrc={ `data:image/jpg;base64,${pollImage}` }
                    croppedHeight={ poll.croppedHeight }
                    croppedWidth={ poll.croppedWidth }
                    croppedX={ poll.croppedX }
                    croppedY={ poll.croppedY }
                /> : null}
            </div>
            <br></br>
            { cookieState ? responsesToDisplay : pollChoices }
        </div>
    )

}
export default PollWidget