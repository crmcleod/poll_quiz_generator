/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
// import NewPoll from '../Components/newPoll'
// import NewTriviaQuiz from '../Components/newTriviaQuiz'

// eslint-disable-next-line no-unused-vars
const NewQuizContainer = () => {

    return(
        <>
            <h1> Let's create a new quiz! </h1>
            <h2> What are we trying to make here: </h2>
            <div id="new-quiz-buttons-wrapper">
                <Link to="/new_quiz/trivia">
                    <div className='new-quiz-button'>
                        <h3> A trivia quiz? </h3>
                    </div>
                </Link>
                <Link to="/new_quiz/poll">
                    <div className='new-quiz-button'>
                        <h3> A Poll? </h3>
                    </div>
                </Link>
            </div>
        </>
    )

}

export default NewQuizContainer