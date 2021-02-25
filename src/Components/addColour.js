/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'

const AddColour = ({ 
    quizObject,
    setQuizObject, 
    quizSaved, 
    index,
    existingQuiz
}) => {

    const [ color, setColor ] = useState({
        r: 182,
        g: 206,
        b: 240,
        a: 1
    })
    const [ boxShadow, setBoxShadow ] = useState( '182, 206, 240, 1' )

    useEffect(() => {
        if( existingQuiz && quizObject.backgroundColour ){
            const rgbCols = quizObject.backgroundColour.split(' ')
            setColor(rgbaToObject(rgbCols))
            setBoxShadow( quizObject.backgroundColour )
        } else {
            handleBoxShadow( boxShadow )
        }
    }, [])

    const rgbaToObject = (rgbCols) => {
        return { 
            r: parseInt( rgbCols[3] ),
            g: parseInt( rgbCols[2] ),
            b: parseInt( rgbCols[1] ),
            a: parseInt( rgbCols[0] )
        }
    }

    const handleColorChange = ( color ) => {
        const rgba = color.rgb
        const rgbaString = rgbaToString( rgba )
        setColor( rgba )
        setQuizObject({ ...quizObject, backgroundColour: rgbaString })
        handleBoxShadow( rgbaString )
    }

    const rgbaToString = ( rgba ) => {
        return (
            `${ rgba.r }, ${ rgba.g }, ${ rgba.b }, ${ rgba.a }`
        )
    }

    const handleBoxShadow = ( rgb ) => {
        setBoxShadow( rgb )
        let colPicker = document.querySelectorAll( '.sketch-picker, #add-image-wrapper' )
        colPicker[ index ? index : 0 ].style.boxShadow = ` 0 0 7px 3px rgba( ${ boxShadow } )`
    }

    // prevents the page from dragging on mobile
    const handleClick = ( e ) => {
        e.preventDefault()
    }

    return(
        <span style={ quizSaved ? {display: 'none'} : {display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <SketchPicker onClick={ handleClick } onChange={ handleColorChange } color={ color } />
        </span>
    )
}

export default AddColour