/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import axios from 'axios'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const QuizList = ({ ids, names }) =>{

    // const [ quizId, setQuizId ] = useState()

    // const handleSelectChange = (e) =>{
    //     setQuizId(e.target.value)
    //     console.log(axios( `${process.env.REACT_APP_SERVER_URL}/quizzes/${e.target.value}`))
    // }

    // let { id } = useParams;

    // let quizzes;
    // useEffect(() => {
    //     if(typeof(quizNames) !== "undefined"){
    //     quizzes = ids.map((id) => {
    //         return <option id="quiz-list" key={id} value={id}>{quizNames[ids.indexOf(id)]}</option>})}
    //     return () => {
            
    //     }
    // }, [ids])

    if(!names){
        return(
            <h1> ... loading ... </h1>
        )
    }

    const quizzes = ids.map((id) => {
        return <option id="quiz-list" key={id} value={id}>{names[ids.indexOf(id)]}</option>})
        
    return(
        <>
            <Helmet>
                <title>
                    Your quizzes
                </title>
            </Helmet>
            <h1> Under construction </h1>
            {/* <select defaultValue="Pick Quiz" onChange={handleSelectChange}>
                <option disabled >Pick Quiz</option>
                { quizzes }
            </select>
            <Link to={`/quizzes/${quizId}`}> Go to quiz</Link> */}
            {/* <Switch>
                <Route exact path={'/quizzes/:id'} 
                    render={() => <QuizCard />} />
            </Switch> */}
        </>
    )

}
export default QuizList