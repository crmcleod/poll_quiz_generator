/* eslint-disable react/prop-types */
import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const Home = ({ userDisplayName }) => {

    return(
        <>
            <h1> Welcome to the quiz generator! </h1>
            <h2><span style={{color: 'lightblue', fontWeight: '900'}}>{userDisplayName}</span> get started with a new quiz or change an existing one. </h2>
            <label htmlFor="existing-quizzes"></label>
            {/* <button onClick={ handleExistingQuizzesClick } id="existing-quizzes">View existing quizzes</button> */}
            <div id="new-quiz-buttons-wrapper">
                <Link className="new-quiz-button link-button" to="/quizzes">Quizzes!</Link>
                <Link className="new-quiz-button link-button" to="/new_quiz"> Create a new quiz?</Link>
            </div>
        </>
    )

}
export default withRouter(Home)