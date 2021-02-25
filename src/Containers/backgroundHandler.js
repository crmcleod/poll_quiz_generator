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

    const [ backgroundOption, setBackgroundOption ] = useState( 'colour' )
    
    const handleBackgroundChoiceChange = ( e ) => {
        setBackgroundOption( e.target.value )
    }

    return(
        <>
            <select 
                className={ 'poll-input ' + 'disable' + questionId + ' background-selector' } 
                onChange={ handleBackgroundChoiceChange } 
            >
                <option value='colour'> Background colour </option>
                <option value='image'> Background image </option>
            </select>

            { backgroundOption === 'colour' ? 
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
                />
            }
        </>
    )

}

export default BackgroundHandler
