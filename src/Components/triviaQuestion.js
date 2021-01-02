/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import axios from 'axios'
import React, { useState } from 'react'

const TriviaQuestion = ({ questionId, quizID, quizObject, setQuizObject, questionNumber }) => {

    const [ questionBody, setQuestionBody ] = useState({
        correctAnswer: '',
        questionBody: '',
        questionNumber,
        quiz: { id: quizID },
        answers: [ '', '', '', '' ],
    })
    const [ questionDisabled, setQuestionDisabled ] = useState( false )

    const handleQuestionBodyChange = ( event ) => { setQuestionBody({ ...questionBody, questionBody: event.target.value })}
    const handleQuestionNumberChange = ( event ) => { setQuestionBody({ ...questionBody, questionNumber: event.target.value })}

    const setAnswers = ( questionIndex, event ) => {
        const newAnswers = [ ...questionBody.answers ]
        newAnswers[ questionIndex ] = event.target.value
        setQuestionBody({ ...questionBody, answers: newAnswers })
    }

    const handleAnswerChange1 = event => setAnswers( 0, event )
    const handleAnswerChange2 = event => setAnswers( 1, event )
    const handleAnswerChange3 = event => setAnswers( 2, event )
    const handleAnswerChange4 = event => setAnswers( 3, event )


    // checks all radio buttons so no alert after first question
    const handleSubmit = ( e ) => {
        e.preventDefault()
        handleRadioClick()
        axios.put(`${process.env.REACT_APP_SERVER_URL}/questions/${questionId}`, questionBody)
        const formFields = document.querySelectorAll(`.disable${ questionId }`)
        for (const field of formFields){
            field.disabled = !field.disabled
        }
        setQuizObject({ ...quizObject, questions: [ ...quizObject.questions, questionBody ] })
        setQuestionDisabled( !questionDisabled )
    }

    const handleRadioClick = ( e )  => {
        if( e ){
            let correctAnswer = e.target.value
            setQuestionBody({ ...questionBody, correctAnswer: questionBody.answers[ correctAnswer ]})
        } else {
            let nodes = document.querySelectorAll(`.correct-answer${questionId}`)
            for ( let node in nodes){
                if( nodes[node].checked ){
                    setQuestionBody({ ...questionBody, correctAnswer: questionBody.answers[ node ]})
                }
            }
        }
    }

    return(

        <div className="trivia-form">
            <span id="question-and-label">
                <label htmlFor="question-number">Question number...</label>
                <input required className={ 'disable' + questionId } id="question-number" type="number" onChange={ handleQuestionNumberChange } value={ questionBody.questionNumber }></input>
            </span>
            <input required className={ 'disable' + questionId } type="text" onChange={ handleQuestionBodyChange } value={ questionBody.questionBody } placeholder="Question..."></input>
            <div>
                <input required className={ 'disable' + questionId} type="text" onChange={ handleAnswerChange1 } 
                    value={ questionBody.answers[0] } 
                    placeholder="Answer..."></input>
                <input name={'correct-answer'+ questionId} className={'correct-answer'+ questionId} type="radio" required onClick={ handleRadioClick } value="0"/>
            </div>
            <div>
                <input required className={ 'disable' + questionId } type="text" onChange={ handleAnswerChange2 } 
                    value={ questionBody.answers[1] } 
                    placeholder="Answer..."></input>
                <input name={'correct-answer'+ questionId} className={'correct-answer'+ questionId} type="radio" onClick={ handleRadioClick } value="1"/>
            </div>
            <div>
                <input required className={ 'disable' + questionId } type="text" onChange={ handleAnswerChange3 } 
                    value={ questionBody.answers[2] } 
                    placeholder="Answer..."></input>
                <input name={'correct-answer'+ questionId} className={'correct-answer'+ questionId} type="radio" onClick={ handleRadioClick } value="2"/>
            </div>
            <div>
                <input required className={ 'disable' + questionId } type="text" onChange={ handleAnswerChange4 } 
                    value={ questionBody.answers[3] } 
                    placeholder="Answer..."></input>
                <input name={'correct-answer'+ questionId} className={'correct-answer'+ questionId} type="radio" onClick={ handleRadioClick } value="3"/>
            </div>
            <button onClick={ handleSubmit } type="button"> { questionDisabled ? 'Edit Question' : 'Save Question'} </button>
        </div>

    )

}

export default TriviaQuestion