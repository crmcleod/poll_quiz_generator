/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import AddColour from '../Components/addColour'
import AddImage from '../Components/addImage'


const BackgroundHandler = ({ 
    quizObject, 
    setQuizObject, 
    quizSaved, 
    imageLoading, 
    setImageLoading, 
    questionId, 
    index,
    existingQuiz
}) => {

    const [ backGroundColorOption, setBackGroundColorOption ] = useState( true )
    
    const handleBackgroundPickChange = ( e ) => {
        let bool = e.target.value === 'true'
        setBackGroundColorOption( bool)
    }

    return(
        <>
            <select className={'poll-input ' + 'disable'+questionId + ' background-selector'} onChange={ handleBackgroundPickChange } >
                <option value={ true }> Background colour </option>
                <option value={ false }> Background image </option>
            </select>
            { backGroundColorOption ? 
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