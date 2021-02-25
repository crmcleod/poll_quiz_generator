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
    const [ boxShadow, setBoxShadow ] = useState( '182, 206, 240, 1' )

    useEffect(() => {
        if( existingQuiz && quizObject.backgroundColour ){
            const rgbCols = quizObject.backgroundColour.split(' ')
            setColor(parseColors(rgbCols))
            setBoxShadow( rgbCols )
        } else {
            handleBoxShadow( boxShadow )
        }
    }, [])

    const parseColors = (rgbCols) => {
        return { 
            r: parseInt( rgbCols[3] ),
            g: parseInt( rgbCols[2] ),
            b: parseInt( rgbCols[1] ),
            a: parseInt( rgbCols[0] )
        }
    }

    const handleColorChange = ( color ) => {
        const rgba = color.rgb
        const rgbaSplit = `${ rgba.r }, ${ rgba.g }, ${ rgba.b }, ${ rgba.a }`
        setColor( rgba )
        setQuizObject({ ...quizObject, backgroundColour: rgbaSplit })
        handleBoxShadow( rgbaSplit )
    }

    const handleBoxShadow = ( rgb ) => {
        let colPicker = document.querySelectorAll( '.sketch-picker, #add-image-wrapper' )
        colPicker[ index ? index : 0 ].style.boxShadow = ` 0 0 7px 3px rgba( ${ boxShadow } )`
        setBoxShadow( rgb )
    }

    // prevents the page from dragging on mobile
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