/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useCallback } from 'react'
import '../poll.css'
import LoadingModal from './loadingModal'
import BackgroundHandler from '../Containers/backgroundHandler'
import { Helmet } from 'react-helmet-async'
import { Prompt } from 'react-router-dom'

const NewPoll = ({ author, id }) => {
    const [ pollObject, setPollObject ] = useState({
        pollName: '',
        pollAuthor: author,
        responses: [],
        choices: [],
        imgID: null,
        backgroundColour: null,
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

    const handlePollSubmission = ( event ) => {
        event.preventDefault()
        if( pollObject.choices.length === 0){
            // add custom alert
            alert('You must have at least one choice!')
        } else {
            setPollSaved( !pollSaved )
            if( !pollPosted ){ 
                axios.post( `${ process.env.REACT_APP_SERVER_URL }/polls`, pollObject )
                    .then(res => setPoll( res.data ))
            } else {
                axios.put( `${ process.env.REACT_APP_SERVER_URL }/polls/${ poll.id }`, pollObject )
                    .then(res => setPoll( res.data ))
            }
            setPollPosted( true )
            const formFields = document.querySelectorAll( '.poll-input' )
            for( let field of formFields ){
                field.disabled = !pollSaved
            }
        }
    }

    const handlePollNameChange = ( event ) => {
        setPollObject({ ...pollObject, pollName: event.target.value })
    }

    const handleAddChoiceClick = () => {
        const prevChoices = [ ...pollObject.choices ]
        prevChoices.push( '' )
        setPollObject({ ...pollObject, choices: prevChoices })
    }

    const handleChoiceChange = ( index, event ) => {
        const prevChoices = [ ...pollObject.choices ]
        prevChoices[ index ] = event.target.value
        setPollObject({ ...pollObject, choices: prevChoices })
    }

    const choicesToDisplay = pollObject.choices.map(( choice, index ) => {
        return(
            <input required key={ index } className="poll-input" type="text" value={ choice } onChange={ (e) => handleChoiceChange(index, e) } placeholder="Choice..."></input>
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
            <h1> Let's create a new poll!</h1>
            <h2> {pollObject.pollName || 'Poll name / Question:'} </h2>
            <p> Author: { author }</p>
            <form id="poll-form" onSubmit={ handlePollSubmission }>
                <input required className="poll-input" id="poll_name_input" value={ pollObject.pollName } onChange={ handlePollNameChange } placeholder="Poll name..."></input>
                { choicesToDisplay }
                <p id="add-poll-choice" onClick={ handleAddChoiceClick } >Add choice<span id="add_question" style={{color: 'red', fontWeight: 'bold'}}> +</span></p>
                <BackgroundHandler 
                    quizObject={ pollObject }
                    setQuizObject={ setPollObject }
                    quizSaved={ pollSaved }
                    imageLoading={ imageLoading }
                    setImageLoading={ setImageLoading }
                />
                
                <button type="submit"> { pollSaved ? 'Edit Poll' : 'Save Poll' } </button>
                
            </form>
            {poll ? pollSaved ?
                <>
                    <h2> Your poll can be found 
                        <br></br>
                        <a style={{ color: 'rgb(215, 80, 18)', textDecoration: 'underline' }} href={`${process.env.REACT_APP_WIDGET_URL}poll/`+ poll.id}> here </a>
                    </h2>
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