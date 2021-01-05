/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import AddColour from '../Components/addColour'
import AddImage from '../Components/addImage'

// eslint-disable-next-line no-unused-vars
const BackgroundHandler = ({ pollObject, setPollObject, pollSaved, imageLoading, setImageLoading }) => {

    const [ backGroundColorOption, setBackGroundColorOption ] = useState( true )
    
    const handleBackgroundPickChange = ( e ) => {
        let bool = e.target.value === 'true'
        setBackGroundColorOption( bool)
    }

    return(
        <>
            <select className="poll-input" onChange={ handleBackgroundPickChange } >
                <option value={ true }> Background colour </option>
                <option value={ false }> Background image </option>
            </select>
            { backGroundColorOption ? 
                <AddColour 
                    pollObject={ pollObject }
                    setPollObject={ setPollObject }
                    pollSaved={ pollSaved }
                />
                :
                <AddImage 
                    pollObject={ pollObject }
                    setPollObject={ setPollObject }
                    pollSaved={ pollSaved }
                    setImageLoading={ setImageLoading }
                />
            }
        </>
    )

}

export default BackgroundHandler