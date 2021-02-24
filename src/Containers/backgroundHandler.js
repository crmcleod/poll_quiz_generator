/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import AddColour from '../Components/addColour'
import AddImage from '../Components/addImage'


const BackgroundHandler = ({ 
    quizObject, 
    setQuizObject, 
    quizSaved, 
    setImageLoading, 
    questionId, 
    index,
    existingQuiz
}) => {

    const [ backGroundColorOption, setBackGroundColorOption ] = useState( 'colour' )
    
    const handleBackgroundPickChange = ( e ) => {
        setBackGroundColorOption( e.target.value )
    }

    return(
        <>
            <select className={'poll-input ' + 'disable' + questionId + ' background-selector'} onChange={ handleBackgroundPickChange } >
                <option value='colour'> Background colour </option>
                <option value='image'> Background image </option>
            </select>
            { backGroundColorOption === 'colour' ? 
                <AddColour 
                    quizObject={ quizObject }
                    setQuizObject={ setQuizObject }
                    pollSaved={ quizSaved }
                    index={ index }
                    existingQuiz={ existingQuiz }
                />
                :
                <AddImage 
                    quizObject={ quizObject }
                    setQuizObject={ setQuizObject }
                    quizSaved={ quizSaved }
                    setImageLoading={ setImageLoading }
                    questionId={ questionId }
                />
            }
        </>
    )

}

export default BackgroundHandler