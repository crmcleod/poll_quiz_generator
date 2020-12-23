/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import NewPoll from '../Components/newPoll'
import NewTriviaQuiz from '../Components/newTriviaQuiz'

const NewQuizContainer = ({ author }) =>{

    const [ triviaQuizComponentActive, setTriviaQuizComponentActive ] = useState(false)
    const [ pollComponentActive, setPollComponentActive ] = useState(false)
    
    const handleCreateTriviaQuiz = () => {
        setPollComponentActive(false)
        setTriviaQuizComponentActive(true)
    }

    const handleCreatePoll = () => {
        setPollComponentActive(true)
        setTriviaQuizComponentActive(false)
    }

    if(triviaQuizComponentActive){
        return <NewTriviaQuiz author={ author } />
    } 
    if( pollComponentActive ){
        return <NewPoll author={ author }/>
    }

    return(
        <>
            {()=>{

            }}
            <h1> Let's create a new quiz! </h1>
            <h2> What are we trying to make here: </h2>
            <h3 onClick={ handleCreateTriviaQuiz }> A trivia quiz? </h3>
            <h3 onClick={ handleCreatePoll }> A Poll? </h3>

            {/* <h3> A poll; </h3>
            <h3> A picture quiz; </h3>
            <h3> A personality quiz; </h3> */}
        </>
    )

}

export default NewQuizContainer