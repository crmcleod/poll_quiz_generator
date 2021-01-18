/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState } from 'react'

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

    const [ editing ] = useState( false )

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

    return(
        <>
            <span>
                <button onClick={ handleDelete } type="button"> Delete this quiz? </button>
                <button type={ editing ? 'submit' : 'button'} value={ editing ? 'submit' : 'edit'}> { editing ? 'Update' : 'Edit'} </button>
            </span>
        </>
    )
}

export default ExistingQuizCard