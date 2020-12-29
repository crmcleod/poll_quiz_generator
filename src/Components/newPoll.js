/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState } from 'react'
import '../poll.css'

const NewPoll = ({ author }) => {

    const [ pollObject, setPollObject ] = useState({
        pollName: '',
        pollAuthor: author,
        responses: [],
        choices: [],
        imgID: null
    })
    const [ poll, setPoll ] = useState()
    const [ pollSaved, setPollSaved ] = useState( false )
    const [ pollPosted, setPollPosted ] = useState( false )

    const handlePollSubmission = ( event ) => {
        event.preventDefault()
        if( !pollPosted ){ 
            axios.post( `${ process.env.REACT_APP_SERVER_URL }/polls`, pollObject )
                .then(res => setPoll( res.data ))
        } else {
            axios.put( `${ process.env.REACT_APP_SERVER_URL }/polls/${ poll.id }`, pollObject )
        }
        setPollPosted( true )
        const formFields = document.querySelectorAll( '.poll-input' )
        for( let field of formFields ){
            field.disabled = !pollSaved
        }
        setPollSaved( !pollSaved )
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

    const handleImageChange = ( e ) => {
        if( e.target.files[ 0 ].size > 10000000){
            alert( 'The file is too large.' )
            document.querySelector( '#poll-img' ).value = ''
        } else {
            let image = new FormData()
            image.append( 'image', e.target.files[ 0 ] )
            axios.post( `${process.env.REACT_APP_SERVER_URL}/upload`, image )
                .then( res => setPollObject({ ...pollObject, imgID: res.data }) )
        }
    }

    const choicesToDisplay = pollObject.choices.map(( choice, index ) => {
        return(
            <input required key={ index } className="poll-input" type="text" value={ choice } onChange={ (e) => handleChoiceChange(index, e) } placeholder="Choice..."></input>
        )
    })

    return(
        <>
            <h1> Let's create a new poll!</h1>
            <h2> Poll name / Question: <br></br>{ pollObject.pollName } </h2>
            <p> Author: { author }</p>
            <form id="poll-form" onSubmit={ handlePollSubmission }>
                <input className="poll-input" id="poll_name_input" value={ pollObject.pollName } onChange={ handlePollNameChange } placeholder="Poll name..."></input>
                { choicesToDisplay }
                <p onClick={ handleAddChoiceClick } >Add choice<span style={{color: 'red', fontWeight: 'bold'}}> +</span></p>
                <input onChange={ handleImageChange } id="poll-img" type="file"/>
                <button type="submit"> { pollSaved ? 'Edit Poll' : 'Save Poll' } </button>
                {poll ? <h2> Your poll can be found <a href={`${process.env.REACT_APP_SERVER_URL}/poll`+ poll.id}>here</a></h2> : null}
            </form>
        </>
    )
}
export default NewPoll