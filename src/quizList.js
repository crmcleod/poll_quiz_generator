import React, {useState, useEffect} from 'react';
import QuizCard from './quizCard';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserHome from './userHome';
import ErrorPage from './errorPage';


const QuizList = ({ids}) =>{

    if(!ids){
        return(
            <h1> ... loading ... </h1>
        )
    }
    const quizzes = ids.map((id) => {
        return <QuizCard id={id} />})
    return(
        <>
            { quizzes }
        </>
    )

}
export default QuizList