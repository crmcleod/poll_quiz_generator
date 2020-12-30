/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState } from 'react'
import '../poll.css'
import { SketchPicker } from 'react-color'

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
        }
    })
    const [ poll, setPoll ] = useState()
    const [ pollSaved, setPollSaved ] = useState( false )
    const [ pollPosted, setPollPosted ] = useState( false )
    const [ copiedToClipboard, setCopiedToClipboard ] = useState( false )
    const [ backGroundColorOption, setBackGroundColorOption ] = useState( true )
    const [ color, setColor ] = useState( '#fff')

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

    const handleImageChange = ( e ) => {
        console.log( e.target.files )
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

    const handleIframeCopyCode = () =>{
        navigator.clipboard.writeText(
            `<iframe src='${process.env.REACT_APP_WIDGET_URL}quiz/${poll.id}' scrolling='disabled'></iframe>`
        )
        setCopiedToClipboard( true )
    }

    const handleColorChange = ( color ) => {
        let rgb = color.rgb
        setColor( rgb )
        setPollObject({ ...pollObject, backgroundColour: `${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a}` })
    }

    const handleBackgroundPickChange = ( e ) => {
        let bool = e.target.value === 'true'
        setBackGroundColorOption( bool)
    }

    return(
        <>
            <h1> Let's create a new poll!</h1>
            <h2> Poll name / Question: <br></br>{ pollObject.pollName } </h2>
            <p> Author: { author }</p>
            <form id="poll-form" onSubmit={ handlePollSubmission }>
                <input required className="poll-input" id="poll_name_input" value={ pollObject.pollName } onChange={ handlePollNameChange } placeholder="Poll name..."></input>
                { choicesToDisplay }
                <p id="add-poll-choice" onClick={ handleAddChoiceClick } >Add choice<span style={{color: 'red', fontWeight: 'bold'}}> +</span></p>
                <select onChange={ handleBackgroundPickChange } >
                    <option value={ true }> Background colour </option>
                    <option value={ false }> Background image </option>
                </select>
                { backGroundColorOption ? 
                    <span style={ pollSaved ? {display: 'none'} : {display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <SketchPicker onChange={ handleColorChange } color={ color } />
                    </span>
                    :
                    <input required onChange={ handleImageChange } id="poll-img" type="file"/>            
                }
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