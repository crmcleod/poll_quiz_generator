/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import NewPoll from './newPoll'
import PollWidget from './pollWidget'
import '../poll.css'
import '../quiz.css'

const ExistingQuizCard = ({ 
    id, 
    setQuizId, 
    populateQuizState, 
    quizzes, 
    setQuizzes, 
    polls, 
    setPolls, 
    currentQuizType 
}) => {

    const [ editing, setEditing ] = useState( false )
    const [ quiz, setQuiz ] = useState()

    const getCurrentQuiz = () => {
        axios.get( `${process.env.REACT_APP_SERVER_URL}/${currentQuizType}/${id}`)
            .then( res => setQuiz( res.data ))
    }

    useEffect(() => {
        getCurrentQuiz()
    }, [ id ])
    const handleDelete = async () => {
        await axios.delete(`${ process.env.REACT_APP_SERVER_URL }/${ currentQuizType }/${ id }`)
            .then( res => {
                if( currentQuizType === 'polls'){
                    let newQuizzes = quizzes.filter( quiz => res.data != quiz.id )
                    setQuizzes( newQuizzes )}
                else if ( currentQuizType === 'quizzes'){
                    let newPolls = polls.filter( poll => res.data != poll.id)
                    setPolls( newPolls )
                }
            })
            .catch( err => console.error( err ))
        setQuizId('')
        document.querySelector('#your-quizzes').selectedIndex = 0

    }

    const handleEditClick = ( e ) => {
        setEditing( !editing )
        console.log( e )
    }

    return(
        <>
            { currentQuizType === 'polls' ? editing ? <NewPoll 
                existingPoll={ true }
                existingPollID={ id }
            /> :
                <iframe style={{ backgroundColor: 'white',
                // borderStyle: 'none', 
                    margin: '1em'
                }} frameBorder="0" width="300" height="400" src={`${process.env.REACT_APP_WIDGET_URL}poll/${id}`}></iframe>
                :
                null
            }
            <span>
                <button onClick={ handleDelete } type="button"> Delete this quiz? </button>
                <button onClick={ handleEditClick } type={ editing ? 'submit' : 'button' } value={ editing ? 'submit' : 'edit'}> { editing ? 'See widget' : 'Edit' } </button>
            </span>
        </>
    )
}

export default ExistingQuizCard