/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import BackgroundHandler from '../Containers/backgroundHandler'
import LoadingModal from './loadingModal'

const TriviaQuestion = ({ 
    questionId, 
    quizID, 
    quizObject, 
    setQuizObject, 
    questionNumber, 
    index, 
    deleteQuestion,
    existingQuiz,
    question,
    existingQuizID
}) => {

    const [ questionBody, setQuestionBody ] = useState({
        correctAnswer: '',
        questionBody: '',
        questionNumber,
        quiz: { id: quizID },
        answers: [ '', '', '', '' ],
        imgID: 0,
        backgroundColour: 0,
        croppedHeight: 0,
        croppedWidth: 0,
        croppedX: 0,
        croppedY: 0,
        id: questionId
    })
    const [ questionDisabled, setQuestionDisabled ] = useState( false )
    const [ imageLoading, setImageLoading ] = useState( false )

    useEffect(() => {
        if( existingQuiz && question.questionBody ){ 
            setQuestionBody( {...questionBody, ...question, quiz: { id: existingQuizID } })
            let radioButtons = document.querySelectorAll(`.correct-answer${questionId}`)
            radioButtons[ question.answers.indexOf(question.correctAnswer) ].checked = true
        }
    }, [])

    const handleQuestionBodyChange = ( event ) => { setQuestionBody({ ...questionBody, questionBody: event.target.value })}
    const handleQuestionNumberChange = ( event ) => { 
        if( event.target.value > 0) {
            setQuestionBody({ ...questionBody, questionNumber: event.target.value })
        }
    }

    const setAnswers = ( questionIndex, event ) => {
        const newAnswers = [ ...questionBody.answers ]
        newAnswers[ questionIndex ] = event.target.value
        setQuestionBody({ ...questionBody, answers: newAnswers })
    }

    const handleAnswerChange1 = event => setAnswers( 0, event )
    const handleAnswerChange2 = event => setAnswers( 1, event )
    const handleAnswerChange3 = event => setAnswers( 2, event )
    const handleAnswerChange4 = event => setAnswers( 3, event )

    const handleSubmit = ( e ) => {
        e.preventDefault()
        handleRadioClick()
        axios.put(`${process.env.REACT_APP_SERVER_URL}/questions/${ questionId }`, questionBody)
        const formFields = document.querySelectorAll(`.disable${ questionId }, .correct-answer${ questionId }`)
        for (const field of formFields){
            field.disabled = !field.disabled
        }
        let newQuestions = quizObject.questions.map(( question ) => question)
        newQuestions[ index ] = questionBody
        setQuizObject({ ...quizObject, questions: newQuestions })
        setQuestionDisabled( !questionDisabled )
    }

    const handleRadioClick = ( e )  => {
        if( e ){
            let correctAnswer = e.target.value
            setQuestionBody({ ...questionBody, correctAnswer: questionBody.answers[ correctAnswer ]})
        } else {
            let nodes = document.querySelectorAll(`.correct-answer${ questionId }`)
            for ( let node in nodes){
                if( nodes[node].checked ){
                    setQuestionBody({ ...questionBody, correctAnswer: questionBody.answers[ node ]})
                }
            }
        }
    }

    const removeQuestionFromDatabase = ( id ) => {
        axios.delete( `${process.env.REACT_APP_SERVER_URL}/questions/${ id }` )
    }

    const handleQuestionDelete = ( index ) => {
        deleteQuestion( index )
        removeQuestionFromDatabase( questionId )
    }
    
    return(
        <>
            { imageLoading && 
                <div id="loading-modal-container">
                    <LoadingModal />
                </div>
            }
            <div className="trivia-form">
                <span id="question-and-label">
                    <label htmlFor="question-number">Question number...</label>
                    <input required className={ 'disable' + questionId + ' question-number'} type="number" onChange={ handleQuestionNumberChange } value={ questionBody.questionNumber }></input>
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
                <BackgroundHandler 
                    setImageLoading={ setImageLoading }
                    quizObject={ questionBody }
                    setQuizObject={ setQuestionBody }
                    quizSaved={ questionDisabled }
                    questionId={ questionId }
                    index={ index }
                    existingQuiz={ existingQuiz }
                />
                <button onClick={ handleSubmit } type="button"> { questionDisabled ? 'Edit Question' : 'Save Question'} </button>
                <button className="delete-from-quiz" type="button" onClick={ () => handleQuestionDelete( index ) }> Delete Question</button>
            </div>
        </>
    )

}

export default TriviaQuestion