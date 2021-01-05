/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const QuizWidgetQuestion = ({ 
    handleTriviaAnswerClick,
    currentResponse, 
    questions, 
    questionCount,
    questionTitle,
    questionNumber

}) => {
    
    // eslint-disable-next-line no-unused-vars
    const [ questionImage, setQuestionImage ] = useState( null )

    useEffect(() => {
        questionTitle ? questions[ questionCount ].imgID ? 
            axios.get(`${process.env.REACT_APP_SERVER_URL}/images/${questions[ questionCount ].imgID}`)
                .then( res => setQuestionImage( res.data.image)) : null : null
    }, [ questionTitle ])


    const questionAnswersToDisplay = ( currentQuestion )  => questions[currentQuestion].answers.map(( question, index ) => {
        return(
            <div className={ 'answers' + ' ' + ( currentResponse === question ? 'selected' : '') } onClick={ () => handleTriviaAnswerClick( question ) } key={ index } >{ question } </div>
        )
    })

    return(
        <>
            <h2 id="question-number"> Question no.{ questionNumber }</h2>
            <h3 id="question-title"> { questions[questionCount].questionBody }</h3>
            { questionAnswersToDisplay( questionCount ) }
        </>

    )
}

export default QuizWidgetQuestion