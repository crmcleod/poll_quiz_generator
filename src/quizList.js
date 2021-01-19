/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ExistingQuizCard from './Components/existingQuizCard'

const QuizList = ({ userEmail, author }) =>{

    const [ quizId, setQuizId ] = useState()
    const [ currentQuizType, setCurrentQuizType ] = useState()
    const [ pollId, setPollId ] = useState()
    const [ quizzes, setQuizzes ] = useState()
    const [ polls, setPolls ] = useState()
    const [ loading, setLoading ] = useState( true )

    useEffect(() => {
        populateQuizState()
    }, [ quizId ])

    useEffect(() => {
        setLoading( false )
    }, [])

    const populateQuizState = () => {
        axios.get( `${ process.env.REACT_APP_SERVER_URL }/users?email=${ userEmail }`)
            .then( res => {
                if( res.data.length !== 0 ){
                    let quizzesDB = res.data[ 0 ].quizzes.map( quiz => quiz )
                    let pollsDB = res.data[ 0 ].polls.map( poll => poll )
                    setQuizzes( quizzesDB )
                    setPolls( pollsDB )
                }
            })
    }

    const handleSelectChange = ( e ) =>{
        let result = e.target.value.split(' ')
        let targetType = result[0]
        let targetID = parseInt(result[1])
        setQuizId( targetID )
        setCurrentQuizType( targetType )
    }

    if( !quizzes || !polls ){
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
                        { quizzes.map(( quiz ) => <option className="quiz-list-option" key={ quiz.id } value={ `quizzes ${quiz.id}` } > { quiz.quizName } </option>
                        )}
                    </optgroup>
                    <optgroup value="polls" label="Polls">
                        { polls.map(( poll ) => <option className="quiz-list-option" key={ poll.id } value={ `polls ${poll.id}` } > { poll.pollName } </option>
                        )}
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
                polls={ polls }
                setPolls={ setPolls }
                currentQuizType={ currentQuizType }
                author={ author }  
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