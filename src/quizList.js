/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ExistingQuizCard from './Components/existingQuizCard'

const QuizList = ({ userEmail }) =>{

    const [ quizId, setQuizId ] = useState()
    const [ quizzes, setQuizzes ] = useState()
    const [ loading, setLoading ] = useState( true )

    useEffect(() => {
        populateQuizState()
    }, [ quizId ])

    useEffect(() => {
        setLoading( false )
    }, [])

    const populateQuizState = () => {
        axios.get( `${process.env.REACT_APP_SERVER_URL}/users?email=${userEmail}`)
            .then( res => {
                if( res.data.length !== 0){
                    let quizzesDB = res.data[0].quizzes.map( quiz => quiz )
                    setQuizzes( quizzesDB )
                }
            })
    }

    const handleSelectChange = (e) =>{
        setQuizId(e.target.value)
    }

    if( !quizzes ){
        return(
            <h1> ... loading ... </h1>
        )
    }
        
    return(
        <>
            <Helmet>
                <title>
                    Your quizzes
                </title>
            </Helmet>
            <h1> Under construction </h1>
            <label htmlFor="your-quizzes"> Select a trivia quiz or poll </label>
            { loading ? null : 
                <select defaultValue="Pick Quiz" name="your-quizzes" id="your-quizzes" onChange={ handleSelectChange }>
                    <option disabled >Pick Quiz</option>
                    <optgroup label="Trivia Quizzes">
                        { quizzes.map((quiz) => <option className="quiz-list-option" key={ quiz.id } value={ quiz.id } > { quiz.quizName } </option>
                        )}
                    </optgroup>
                    <optgroup label="Polls">
                        
                    </optgroup>
                </select>
            }

            { quizId && 
            <ExistingQuizCard 
                id={ quizId } 
                populateQuizState={ populateQuizState } 
                setQuizId={ setQuizId } 
                quizzes={ quizzes }
                setQuizzes={ setQuizzes }    
            /> }
            
            
            
            {/* <Link to={`/quizzes/${quizId}`}> Go to quiz</Link> */}
            {/* <Switch>
                <Route exact path={'/quizzes/:id'} 
                    render={() => <QuizCard />} />
            </Switch> */}
        </>
    )

}
export default QuizList