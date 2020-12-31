import React from 'react'
import icon from '../assets/You_Doodle_2020-12-31T12_19_55Z.PNG'

const LoadingModal = () =>{

    return (
        <div id="loading-modal">
            <img src={ icon } />
            <h1>One moment</h1>
        </div>
    )
}

export default LoadingModal