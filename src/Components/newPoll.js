/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from 'react'
import '../poll.css'
import LoadingModal from './loadingModal'
import BackgroundHandler from '../Containers/backgroundHandler'
import { Helmet } from 'react-helmet-async'
import { Prompt } from 'react-router-dom'

const NewPoll = ({ author, id, existingPoll, existingPollID }) => {
    const [ pollObject ] = useState({
        pollName: '',
        pollAuthor: author,
        responses: [],
        choices: [],
        imgID: null,
        backgroundColour: '182, 206, 240, 1',
        user: {
            id
        },
        croppedHeight: 0,
        croppedWidth: 0,
        croppedX: 0,
        croppedY: 0
    })

    const [ poll, setPoll ] = useState()
    const [ pollSaved, setPollSaved ] = useState( false )
    const [ pollPosted, setPollPosted ] = useState( false )
    const [ copiedToClipboard, setCopiedToClipboard ] = useState( false )
    const [ imageLoading, setImageLoading ] = useState( false )
    const pollNameRef = useRef()
    const pollChoicesRef = useRef()
    const pollIdRef = useRef()

    useEffect(() => {
        if ( poll ){
            pollIdRef.current = poll.id
            pollNameRef.current = poll.pollName
            pollChoicesRef.current = poll.choices}
    }, [ poll ])

    useEffect(() => {
        existingPoll ? 
            axios.get( `${ process.env.REACT_APP_SERVER_URL }/polls/${existingPollID}`)
                .then( res => setPoll( res.data )) :
            axios.post( `${ process.env.REACT_APP_SERVER_URL }/polls`, pollObject )
                .then(res => setPoll( res.data ))
    }, [])

    useEffect(() => {
        return () => {
            if ( !pollNameRef.current || pollChoicesRef.current.length === 0 ){
                axios.delete( `${ process.env.REACT_APP_SERVER_URL }/polls/${ pollIdRef.current }`)
                    .catch( err => console.error( err ))
            }
        }
    }, [])

    const handlePollSubmission = ( event ) => {
        event.preventDefault()
        if( poll.choices.length === 0){
            // add custom alert
            alert('You must have at least one choice!')
        } else {
            setPollSaved( !pollSaved )
            axios.put( `${ process.env.REACT_APP_SERVER_URL }/polls/${ poll.id }`, poll )
                .then(res => setPoll( res.data ))
            for ( const index in  poll.responses ){
                axios.put(`${process.env.REACT_APP_SERVER_URL}/responses/${poll.responses[index].id}`, poll.responses[ index ])
            }
            setPollPosted( true )
            const formFields = document.querySelectorAll( '.poll-input, .delete-from-quiz')
            for( let field of formFields ){
                field.disabled = !pollSaved
            }
        }
    }

    const handlePollNameChange = ( event ) => {
        setPoll({ ...poll, pollName: event.target.value })
    }

    const handleAddChoiceClick = () => {
        if( pollSaved ) {
            // add custom modal
            alert('You must edit the poll to add more choices.')}
        else {
            const prevChoices = [ ...poll.choices ]
            const prevResponses = [ ...poll.responses ]
            prevChoices.push( '' )
            axios.post(`${process.env.REACT_APP_SERVER_URL}/responses`, {
                'response': ' ',
                'responseCount': 0,
                'poll': { 'id': poll.id }
            })
                .then( res => prevResponses.push(res.data))
                .then( setPoll({ ...poll, choices: prevChoices, responses: prevResponses }))
            // setPollObject({ ...pollObject, choices: prevChoices, responses: prevResponses })
        }
    }

    const handleChoiceChange = ( index, event ) => {
        const prevChoices = [ ...poll.choices ]
        const prevResponses = [ ...poll.responses ]
        prevChoices[ index ] = event.target.value
        prevResponses[ index ] = {...prevResponses[ index ], poll: {id: poll.id}, response: event.target.value }
        setPoll({ ...poll, choices: prevChoices, responses: prevResponses })
    }

    const handlePollChoiceDelete = async ( i ) => {
        const newChoices = [ ...poll.choices ]
        const newResponses = [ ...poll.responses ]
        newChoices.splice( i, 1 )
        setPoll({ ...poll, choices: newChoices, responses: newResponses })
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/responses/${poll.responses[ i ].id}`)
            .then( newResponses.splice( i, 1 ) )
        
    }

    const choicesToDisplay = !poll ? null : poll.choices.map(( choice, index ) => {
        return(
            <div className="poll-input-wrapper" key={ index }>
                <input required key={ index } className="poll-input" type="text" value={ choice } onChange={ ( e ) => handleChoiceChange(index, e) } placeholder="Choice..."></input>
                <button className="delete-from-quiz" onClick={ ( e ) => handlePollChoiceDelete( index, e ) }> x </button>
            </div>
        )
    })

    const handleIframeCopyCode = () =>{
        navigator.clipboard.writeText(
            `<iframe style={{ backgroundColor: 'white', borderStyle: 'none', margin: '1em'}} width="300" height="400" src='${process.env.REACT_APP_WIDGET_URL}poll/${poll.id}' scrolling='disabled' sandbox="allow-scripts allow-forms allow-same-origin"></iframe>`
        )
        setCopiedToClipboard( true )
    }

    return(
        <>
            <Helmet>
                <title>
                    New Poll
                </title>
            </Helmet>
            { imageLoading && 
                <div id="loading-modal-container">
                    <LoadingModal />
                </div>
            }
            <Prompt
                when={ !pollPosted }
                message={ 'Are you sure you want to leave this page, any changes will be lost?' }
            />
            { existingPoll ? null :
                <>
                    <h1> Let's create a new poll!</h1>
                    <h2> { poll ? poll.pollName ? poll.pollName : 'Poll name / Question:' : null} </h2>
                    <p> Author: { author }</p>
                </> }

            <form id="poll-form" onSubmit={ handlePollSubmission }>
                <input required className="poll-input" id="poll_name_input" value={ poll ? poll.pollName : '' } onChange={ handlePollNameChange } placeholder="Poll name..."></input>
                { choicesToDisplay }
                <p id="add-poll-choice" onClick={ handleAddChoiceClick } >Add choice<span id="add_question" style={{color: 'red', fontWeight: 'bold'}}> +</span></p>
                <BackgroundHandler 
                    quizObject={ poll }
                    setQuizObject={ setPoll }
                    quizSaved={ pollSaved }
                    imageLoading={ imageLoading }
                    setImageLoading={ setImageLoading }
                />
                
                <button type="submit"> { pollSaved ? 'Edit Poll' : 'Save Poll' } </button>
                
            </form>
            {poll ? pollSaved ?
                <>
                    { existingPoll ? null : 
                        <h2> Your poll can be found 
                            <br></br>
                            <a style={{ color: 'rgb(215, 80, 18)', textDecoration: 'underline' }} href={`${process.env.REACT_APP_WIDGET_URL}poll/`+ poll.id}> here </a>
                        </h2>}
                    <div id="iframe-grab">
                        <h3> Get iframe code :</h3>
                        <button onClick={ handleIframeCopyCode } type="button"> { copiedToClipboard ? 'Copied' : 'Copy iframe code to clipboard' } </button>
                    </div> 
                </>
                : null
                : null}
        </>
    )
}
export default NewPoll