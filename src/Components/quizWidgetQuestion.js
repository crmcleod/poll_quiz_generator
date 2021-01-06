/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CroppedImage from './croppedImage'

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
    // eslint-disable-next-line no-unused-vars
    const [ question, setQuestion ] = useState()

    useEffect(async () => {
        questionTitle ? questions[ questionCount ].imgID ? 
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/images/${questions[ questionCount ].imgID}`)
                .then( res => setQuestionImage( res.data.image)) : setQuestionImage(null) : setQuestionImage(null)
    }, [ questionNumber ])

    useEffect(() => {
        setQuestion( questions[ questionCount ])
    }, [ questionCount ])


    const questionAnswersToDisplay = ( currentQuestion )  => questions[currentQuestion].answers.map(( question, index ) => {
        return(
            <div className={ 'answers' + ' ' + ( currentResponse === question ? 'selected' : '') } onClick={ () => handleTriviaAnswerClick( question ) } key={ index } >{ question } </div>
        )
    })

    if( !question ){
        return null
    }
    return(
        <>
            <div style={ questionImage ? null : { backgroundColor: `rgba(${question.backgroundColour})`, width: '100%' } } id="image-title-wrapper">
                <div> { question && 
                <>
                    {/* Question no. { questionNumber }
                    <br></br>
                    { questions[questionCount].questionBody } */}
                    <h2 id="widget-question-number"> Question no. { questionNumber }</h2>
                    <h3 id="question-title"> { questions[questionCount].questionBody }</h3>
                </> 
                }
                </div>

                { questionImage ? <CroppedImage 
                    imageSrc={ `data:image/png;base64,${questionImage}` }
                    croppedHeight={ question.croppedHeight }
                    croppedWidth={ question.croppedWidth }
                    croppedX={ question.croppedX }
                    croppedY={ question.croppedY }
                /> : null}
            </div>
            { questionAnswersToDisplay( questionCount ) }
        </>

    )
}

export default QuizWidgetQuestion