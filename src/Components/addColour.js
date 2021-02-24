/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'

const AddColour = ({ 
    quizObject, 
    setQuizObject, 
    pollSaved, 
    index,
    existingQuiz
}) => {

    const [ color, setColor ] = useState({
        a: 1,
        b: 240,
        g: 206,
        r: 182
    })
    const [ boxShadow, setBoxShadow ] = useState( '240, 206, 182, 1' )

    useEffect( async () => {
        handleBoxShadow()
        if( existingQuiz && quizObject.backgroundColour ){
            let rgbCols = quizObject.backgroundColour.split(' ')
            setColor({ 
                r: parseInt( rgbCols[3] ),
                g: parseInt( rgbCols[2] ),
                b: parseInt( rgbCols[1] ),
                a: parseInt( rgbCols[0] )
            })
        }
    }, [])

    const handleColorChange = ( color ) => {
        const rgb = color.rgb
        const rgbSplit = `${ rgb.r }, ${ rgb.g }, ${ rgb.b }, ${ rgb.a }`
        setColor( rgb )
        setQuizObject({ ...quizObject, backgroundColour: rgbSplit })
        handleBoxShadow( rgbSplit )
    }
    const handleBoxShadow = ( rgb ) => {
        let colPicker = document.querySelectorAll( '.sketch-picker, #add-image-wrapper' )
        colPicker[ index ? index : 0 ].style.boxShadow = ` 0 0 7px 3px rgba( ${ boxShadow } )`
        setBoxShadow( rgb )
    }

    const handleClick = ( e ) => {
        e.preventDefault()
    }

    return(
        <span style={ pollSaved ? {display: 'none'} : {display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <SketchPicker onClick={ handleClick } onChange={ handleColorChange } color={ color } />
        </span>
    )
}

export default AddColour