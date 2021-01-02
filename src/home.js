/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import icon from './assets/You_Doodle_2020-12-31T12_19_55Z.PNG'

const Home = ({ userDisplayName }) => {

    const [ loading, setLoading ] = useState( true )

    useEffect(() => {
        setTimeout(() => {
            setLoading( false )
        }, 1000 )
    
        return () => {
            clearTimeout(setLoading( false ))
        }
    }
    )

    return(
        <>
            { !loading ?
                <>
                    <h1> Welcome to the quiz generator! </h1>
                    <h2><span style={{color: 'lightblue', fontWeight: '900'}}>{ userDisplayName }</span> get started with a new quiz or change an existing one. </h2>
                    <label htmlFor="existing-quizzes"></label>
                    {/* <button onClick={ handleExistingQuizzesClick } id="existing-quizzes">View existing quizzes</button> */}
                    <div id="new-quiz-buttons-wrapper">
                        <Link className="new-quiz-button link-button" to="/quizzes">Quizzes!</Link>
                        <Link className="new-quiz-button link-button" to="/new_quiz"> Create a new quiz?</Link>
                    </div>
                </>
                :
                <img id="icon-load" src={ icon } />
            }
        </>
    )

}
export default Home