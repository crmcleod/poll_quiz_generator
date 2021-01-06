/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import icon from '../assets/You_Doodle_2020-12-31T12_19_55Z.PNG'


// eslint-disable-next-line react/prop-types
const AlertModal = ({ message }) => {

    return(
        <div id="alert-modal">
            <img src={ icon } />
        </div>
    )
}

export default AlertModal