import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'

const NavBarContainer = () => {

    return(

        <nav id="nav-bar">
            <ul>
                <li>
                    <Link to ="/">Home</Link>
                </li>
                <li>
                    <Link to ="/quizzes">Your quizzes</Link>
                </li>
                <li>
                    <Link to ="/new_quiz"> New quiz </Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBarContainer;