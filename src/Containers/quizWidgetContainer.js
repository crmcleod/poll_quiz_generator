/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PollWidget from '../Components/pollWidget'
import QuizWidget from '../Components/quizWidget'

const QuizWidgetContainer = () => {

    useEffect(() => {
        const appWrapper = document.querySelector('.app-wrapper').style
        appWrapper.display = 'none'
    })
    
    const { type, id } = useParams()

    return(
        <>
            { type === 'poll' && <PollWidget id={ id } />}
            { type === 'quiz' && <QuizWidget id={id} />}
        </>

    )

}

export default QuizWidgetContainer