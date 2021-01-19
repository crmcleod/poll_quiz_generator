/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import NewPoll from './newPoll'
import PollWidget from './pollWidget'
import '../poll.css'
import '../quiz.css'
import NewTriviaQuiz from './newTriviaQuiz'

const ExistingQuizCard = ({ 
    id, 
    setQuizId, 
    populateQuizState, 
    quizzes, 
    setQuizzes, 
    polls, 
    setPolls, 
    currentQuizType,
    author
}) => {

    const [ editing, setEditing ] = useState( false )
    const [ quiz, setQuiz ] = useState()
    const [ checkDelete, setCheckDelete ] = useState( false )

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

    const handleDeleteCheck = () => {
        setCheckDelete( !checkDelete )
    }

    const handleEditClick = ( e ) => {
        setEditing( !editing )
    }

    return(
        <>
            { currentQuizType === 'polls' ? editing ? 
                <NewPoll 
                    existingPoll={ true }
                    existingPollID={ id }
                    author={ author }
                /> :
                <iframe 
                    style={{ backgroundColor: 'white', margin: '1em'}} 
                    frameBorder="0" 
                    width="300" 
                    height="400" 
                    src={`${process.env.REACT_APP_WIDGET_URL}poll/${id}`} />
                :
                null
            }
            { currentQuizType === 'quizzes' ? editing ? 
                <div style={{
                    width: '80%', 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    border: '2px rgba(255,255,255,0.3) solid',
                    padding: '1em',
                    margin: '1em',
                    borderRadius: '0.5em'
                }}>
                    <NewTriviaQuiz  
                        existingQuiz={ true }
                        existingQuizID={ id }
                        author={ author }
                    />
                </div> :
                <iframe 
                    style={{ backgroundColor: 'white', margin: '1em'}} 
                    frameBorder="0" 
                    width="300" 
                    height="400" 
                    src={`${process.env.REACT_APP_WIDGET_URL}quiz/${id}`} />
                :
                null
            }
            { checkDelete ? 
                <span>
                    <button onClick={ handleDelete } type="button"> Delete </button>
                    <button onClick={ handleDeleteCheck } type={ 'button' }> Cancel </button>
                </span>
                :
                <span>
                    <button onClick={ handleDeleteCheck } type="button"> Delete this quiz? </button>
                    <button onClick={ handleEditClick } type={ editing ? 'submit' : 'button' } value={ editing ? 'submit' : 'edit'}> { editing ? 'See widget' : 'Edit' } </button>
                </span> }
        </>
    )
}

export default ExistingQuizCard