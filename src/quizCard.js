/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const QuizCard = ( props ) =>{

    const [ quizData, setQuizData ] = useState()

    useEffect( () => {
        if( props ){
            axios.get( `${process.env.REACT_APP_SERVER_URL}/quizzes/${props.match.params.id}`)
                .then( res => setQuizData(res.data))}
    }, [props])

    let questions
    if(quizData) {
        questions = quizData.questions.map((question) => {
            return(
                <li key={question.id}>
                    <label htmlFor={question.id}>{question.questionBody}</label>
                    <input type="radio" id={question.id} name="quiz"></input>
                </li>
            )
        })
    }

    if(!quizData){
        return(
            <>
                <h1> Quiz not found... </h1>
            </>
        )
    }

    // const questions = quizData.questions.map((question) => {
    //     return(
    //         <li>
    //             <label for={question.id}>{question.questionBody}</label>
    //             <input type="radio" id={question.id} name="quiz"></input>
    //         </li>
    //     )
    // })
    

    return(
        <>
            <h3> {quizData.quizName}</h3>
            <ul>
                {questions}
            </ul>
        </>
    )

}

export default withRouter(QuizCard)