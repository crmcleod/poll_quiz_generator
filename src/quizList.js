import React, {useState, useEffect} from 'react';
import QuizCard from './quizCard';
import { BrowserRouter as Router, Route } from "react-router-dom";


const QuizList = ({ids}) =>{

    const quizzes = ids.map((id) => {
        return <QuizCard id={id} />})

    return(
        
            <>
                <h1> Quiz list! </h1>
                { quizzes }
            </>
    )

}
export default QuizList