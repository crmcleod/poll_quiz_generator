import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, withRouter } from 'react-router-dom';

const QuizCard = (props) =>{

    const [ quizData, setQuizData ] = useState();

    useEffect( async() => {
        if(props){
        const result = await axios( `${process.env.REACT_APP_SERVER_URL}/quizzes/${props.match.params.id}`)
        setQuizData(result.data)}
    }, [props])

    let questions;
    if(quizData) {
        questions = quizData.questions.map((question) => {
                return(
                    <li>
                        <label for={question.id}>{question.questionBody}</label>
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

export default withRouter(QuizCard);