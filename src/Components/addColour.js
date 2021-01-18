/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { SketchPicker } from 'react-color'

const AddColour = ({ quizObject, setQuizObject, pollSaved }) => {

    const [ color, setColor ] = useState({
        a: 1,
        b: 240,
        g: 206,
        r: 182
    })
    const [ boxShadow, setBoxShadow ] = useState(240, 206, 182, 1)

    const handleColorChange = async ( color ) => {
        let colPicker = document.querySelector('.sketch-picker').style
        let rgb = color.rgb
        let rgbSplit = `${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a}`
        setColor( await rgb )
        setBoxShadow( await rgbSplit )
        setQuizObject({ ...quizObject, backgroundColour: rgbSplit })
        colPicker.boxShadow = ` 0 0 7px 3px rgba(${boxShadow})`
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