import React, { useState, useEffect } from 'react'
import axios from 'axios'

const QuizCard = ({id}) =>{

    const [ quizData, setQuizData ] = useState();

    useEffect( async() => {
        const result = await axios( `${process.env.REACT_APP_SERVER_URL}/quizzes/${id}`)
        setQuizData(result.data)
    }, [])
        
    if(!quizData){
        return(
            <h1> ...Loading... </h1>
        )
    }

    const questions = quizData.questions.map((question) => {
        return(
            <li>
                <label for={question.id}>{question.questionBody}</label>
                <input type="radio" id={question.id} name="quiz"></input>
            </li>
        )
    })

    return(
        <>
            <h3> {quizData.quizName}</h3>
            <ul>
                {questions}
            </ul>
        </>
    )

}

export default QuizCard;