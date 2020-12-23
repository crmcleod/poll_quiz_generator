/* eslint-disable react/prop-types */
import React from 'react'
import {Link, Switch, withRouter} from 'react-router-dom'

const Home = ({ userDisplayName }) => {

    return(
        <>
            <h1> Welcome to the quiz generatorrrrr, quizzards! </h1>
            <h2>{userDisplayName} get started with a new quiz or change an existing one. </h2>
            <label htmlFor="existing-quizzes"></label>
            {/* <button onClick={ handleExistingQuizzesClick } id="existing-quizzes">View existing quizzes</button> */}
            <Switch>
                <Link to="/quizzes">Quizzes!</Link>
                <Link to="/new_quiz"> Create a new quiz? </Link>
            </Switch>

        </>
    )

}
export default withRouter(Home)