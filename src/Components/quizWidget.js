/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const QuizWidget = ({ id }) => {

    const [ quizName, setQuizName ] = useState()
    const [ quizAuthor, setQuizAuthor ] = useState()
    const [ questions, setQuestions ] = useState()
    const [ questionCount, setQuestionCount ] = useState(0)
    const [ outcomes, setOutcomes ] = useState()
    const [ responses, setResponses ] = useState([])

    useEffect(() => {
        // replace with env
        axios.get(`http://localhost:8080/quizzes/${ id }`)
            .then( res => { 

                let orderedQuestions = []
                for ( const question of res.data.questions){
                    orderedQuestions[ question.questionNumber ] = question
                }
                const filteredQuestions = orderedQuestions.filter(( question ) => question !== null)
                setQuizName( res.data.quizName )
                setQuizAuthor( res.data.quizAuthor )
                setQuestions( filteredQuestions )
                setOutcomes( res.data.outcomes ) 
            })
    },[ id ])

    const handleTriviaAnswerClick = ( e ) => {
        let prevResponses = [ ...responses ]
        if( questions[questionCount].correctAnswer === e ){
            prevResponses.push( true )
        } else {
            prevResponses.push( false )
        }
        if( responses.length <= questionCount ){
            setResponses( prevResponses )}
    }

    const questionAnswersToDisplay = ( currentQuestion )  => questions[currentQuestion].answers.map(( question, index ) => {
        return(
            <div onClick={ () => handleTriviaAnswerClick( question ) } key={ index } >{ question } </div>
        )
    })
    if( !questions ){
        return(
            <h1>Just fetching the quiz</h1>
        )
    }
    return(
        <>
            <h1> { quizName }</h1>
            <h2> Question no.{ questionCount+1 }</h2>
            <h3> { questions[questionCount].questionBody }</h3>
            { questionAnswersToDisplay( questionCount ) }
            { questionCount + 1 < questions.length && <button type="button">Next Question</button> }
            { questionCount !== 0 && <button type="button">Previous Question </button> }
            <button type="button"> Submit answers! </button>

        </>
    )
}

export default QuizWidget