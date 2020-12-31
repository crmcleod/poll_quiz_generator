import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import icon from '../assets/You_Doodle_2020-12-31T12_19_55Z.PNG'

const NavBarContainer = () => {

    return(

        <nav id="nav-bar">
            <ul>
                <li>
                    <Link to="/"><img id="nav-home-icon" src={ icon } /> </Link>
                </li>
                <li>
                    <Link to="/quizzes">Your quizzes</Link>
                </li>
                <li>
                    <Link to="/new_quiz"> New quiz </Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBarContainer