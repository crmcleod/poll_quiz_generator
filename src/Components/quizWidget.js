/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../quiz.css'

const QuizWidget = ({ id }) => {

    const [ quizName, setQuizName ] = useState()
    const [ quizAuthor, setQuizAuthor ] = useState()
    const [ questions, setQuestions ] = useState()
    const [ questionCount, setQuestionCount ] = useState( 0 )
    const [ outcomes, setOutcomes ] = useState()
    const [ responses, setResponses ] = useState([])
    const [ score, setScore ] = useState( 0 )
    const [ quizInProcess, setQuizInProcess ] = useState( true )

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
            <div className={ 'answers' } onClick={ () => handleTriviaAnswerClick( question ) } key={ index } >{ question } </div>
        )
    })

    const outcomeToDisplay = () => {
        for( let outcome of outcomes){
            if( eval( score + outcome.conditionComparator + outcome.conditionValue ) ){
                return (
                    <>
                        <h1>{ outcome.outcomeName }</h1>
                        <h2>{ outcome.outcomeBody }</h2>
                    </>
                )
            }
        }
    }
    
    const handleSubmitQuizAnswers = () => {
        const finalScore = responses.filter(( response ) => response === true).length
        setScore( finalScore )
        setQuizInProcess( false )
    }

    const handleNextQClick = () => {
        setQuestionCount( questionCount + 1 )
    }
    const handlePrevQClick = () => {
        setQuestionCount(questionCount - 1)
    }
    if( !questions ){
        return(
            <h1>Just fetching the quiz</h1>
        )
    }
    if( quizInProcess ){
        return(
            <div id="trivia-widget-wrapper">
                <h1 id="quiz-name"> { quizName }</h1>
                <h2 id="question-number"> Question no.{ questionCount+1 }</h2>
                <h3 id="question-title"> { questions[questionCount].questionBody }</h3>
                { questionAnswersToDisplay( questionCount ) }
                <div id="question-nav-wrapper">
                    {/* { questionCount + 1 < questions.length && <button className="quiz-button" type="button">Next Question</button> } */}
                    { questionCount !== 0 && <button className="quiz-button prev" onClick={ handlePrevQClick } type="button">Previous Question </button> }
                    { questionCount + 1 < questions.length ? 
                        <button className="quiz-button next" onClick={ handleNextQClick } type="button">Next Question</button> : 
                        <button className="quiz-button next" onClick={ handleSubmitQuizAnswers } type="button">Submit Answers</button>
                    }
                </div>
            </div>
        )}

    return(
        <h3>
            You scored { score } out of { questions.length }
            { outcomeToDisplay() }
        </h3>
    )
}

export default QuizWidget