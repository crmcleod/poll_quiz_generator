/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import AddColour from '../Components/addColour'
import AddImage from '../Components/addImage'

// eslint-disable-next-line no-unused-vars
const BackgroundHandler = ({ quizObject, setQuizObject, quizSaved, imageLoading, setImageLoading, questionId }) => {

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