/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import axios from 'axios'
import React, { useState } from 'react'

const TriviaQuestion = ({ questionId, quizID, quizObject, setQuizObject }) => {

    const [ questionBody, setQuestionBody ] = useState({
        correctAnswer: '',
        questionBody: '',
        questionNumber: '',
        quiz: { id: quizID },
        answers: [ '', '', '', '' ],
    })

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

    const handleSaveButtonClick = () => {
        handleRadioClick()
        axios.put(`${process.env.REACT_APP_SERVER_URL}/questions/${questionId}`, questionBody)
        const formFields = document.querySelectorAll(`.disable${ questionId }`)
        for (const field of formFields){
            field.disabled = !field.disabled
        }
        setQuizObject({ ...quizObject, questions: [ ...quizObject.questions, questionBody ] })
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

        <div style={{display: 'flex', flexDirection: 'column'}}>
            <input className={ 'disable' + questionId } type="text" onChange={ handleQuestionBodyChange } value={ questionBody.questionBody } placeholder="Question..."></input>
            <input className={ 'disable' + questionId } type="text" onChange={ handleQuestionNumberChange } value={ questionBody.questionNumber } placeHolder="Question number..."></input>
            <select className={ 'disable' + questionId }>
                <option>Single answer?</option>
                <option>Multiple answers?</option>
            </select>
            <span>
                <input className={ 'disable' + questionId} type="text" onChange={ handleAnswerChange1 } 
                    value={ questionBody.answers[0] } 
                    placeHolder="Answer..."></input>
                <input name={'correct-answer'+ questionId} className={'correct-answer'+ questionId} type="radio" onClick={ handleRadioClick } value="0"/>
            </span>
            <span>
                <input className={ 'disable' + questionId } type="text" onChange={ handleAnswerChange2 } 
                    value={ questionBody.answers[1] } 
                    placeHolder="Answer..."></input>
                <input name={'correct-answer'+ questionId} className={'correct-answer'+ questionId} type="radio" onClick={ handleRadioClick } value="1"/>
            </span>
            <span>
                <input className={ 'disable' + questionId } type="text" onChange={ handleAnswerChange3 } 
                    value={ questionBody.answers[2] } 
                    placeHolder="Answer..."></input>
                <input name={'correct-answer'+ questionId} className={'correct-answer'+ questionId} type="radio" onClick={ handleRadioClick } value="2"/>
            </span>
            <span>
                <input className={ 'disable' + questionId } type="text" onChange={ handleAnswerChange4 } 
                    value={ questionBody.answers[3] } 
                    placeHolder="Answer..."></input>
                <input name={'correct-answer'+ questionId} className={'correct-answer'+ questionId} type="radio" onClick={ handleRadioClick } value="3"/>
            </span>
            <span>
                <button onClick={ handleSaveButtonClick } type="button"> Save Question </button>
                <button type="button"> Edit Question </button>
            </span>
        </div>

    )

}

export default TriviaQuestion