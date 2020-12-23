/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import QuizCard from './quizCard'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
// import axios from 'axios'


const QuizList = ({ids, quizNames}) =>{

    const [ quizId, setQuizId ] = useState()
    const handleSelectChange = (e) =>{
        setQuizId(e.target.value)
        // console.log(axios( `${process.env.REACT_APP_SERVER_URL}/quizzes/${e.target.value}`))
    }

    // let { id } = useParams;

    // let quizzes;
    // useEffect(() => {
    //     if(typeof(quizNames) !== "undefined"){
    //     quizzes = ids.map((id) => {
    //         return <option id="quiz-list" key={id} value={id}>{quizNames[ids.indexOf(id)]}</option>})}
    //     return () => {
            
    //     }
    // }, [ids])

    if(!quizNames){
        return(
            <h1> ... loading ... </h1>
        )
    }

    const quizzes = ids.map((id) => {
        return <option id="quiz-list" key={id} value={id}>{quizNames[ids.indexOf(id)]}</option>})
        
    return(
        <>
            <select onChange={handleSelectChange}>
                <option disabled selected>Pick Quiz</option>
                { quizzes }
            </select>
            <Link to={`/quizzes/${quizId}`}> Go to quiz</Link>
            <Switch>
                <Route exact path={'/quizzes/:id'} 
                    render={() => <QuizCard />} />
            </Switch>
        </>
    )

}
export default withRouter(QuizList)