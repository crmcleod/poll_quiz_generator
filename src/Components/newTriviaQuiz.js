/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TriviaQuestion from './triviaQuestion'

const NewTriviaQuiz = ({ author }) =>{

    const [ questionSchema, setQuestionSchema ] = useState({
        questionNumber: 0,
        questionBody: '',
        correctAnswer: false,
        quiz: {},
        answers: []
    })
    const [ questions, setQuestions ] = useState([])
    const [ outcomes, setOutcomes ] = useState([])
    // const [ quizAuthor, setQuizAuthor ] = useState();
    const [ quizID, setQuizID ] = useState()
    const [ quizObject, setQuizObject ] = useState({
        quizName: '',
        quizAuthor: author,
        questions: [],
        outcomes: [],
        user: {
            id: 1
        }
    })

    const postQuizToGetID = () => {
        axios.post(`${ process.env.REACT_APP_SERVER_URL }/quizzes`, quizObject)
            .then( res => setQuizID(res.data.id))
    }

    useEffect( () => {
        postQuizToGetID()
    }, [])

    const outcomesToDisplay = outcomes.map(() =>{
        return(
            <>
                <br></br>
                <input type="text" placeholder="Outcome name / number..."></input>
                <input type="text" placeholder="Outcome..."></input>
            </>
        )
    })

    const questionsToDisplay = questions.map(( question ) => {
        return(
            <>
                <br></br>
                <TriviaQuestion key={ question.id } questionId={ question.id } quizID={ quizID } />
            </>
        )
    })


    const handleAddQuestionClick = async () =>{
        const prevQuestions = [...questions]

        const newSchemaWithQuizID = { ...questionSchema, quiz: { id: quizID } }

        await axios.post( `${process.env.REACT_APP_SERVER_URL}/questions`, newSchemaWithQuizID )
            .then( res => (prevQuestions.push( {...newSchemaWithQuizID, id: res.data.id } )))
        setQuestions(prevQuestions)
        setQuestionSchema(newSchemaWithQuizID)
    }

    const handleAddOutcomeClick = () =>{
        const newOutcomes = outcomes.map( (outcome) =>{
            return outcome
        })

        newOutcomes.push({})
        setOutcomes(newOutcomes)

    }

    const handleQuizNameChange = (event) => {
        setQuizObject({...quizObject, quizName: event.target.value})
        axios.put(`${process.env.REACT_APP_SERVER_URL}/quizzes/${quizID}`, quizObject)
    }

    const handleQuestionSubmit = (event) =>{
        event.preventDefault()
    }

    const submitQuiz = () => {
        
        axios.post(`${process.env.REACT_APP_SERVER_URL}/quizzes`, quizObject)
        console.log(quizObject)

    }

    return(
        <>
            <h1> Let's create a new trivia quiz! </h1>
            <p>{quizObject.quizName}</p>
            <form onSubmit={handleQuestionSubmit}>
                <label htmlFor="quiz_name_input"> Quiz title...</label>
                <input id="quiz_name_input" value={quizObject.quizName} onChange={handleQuizNameChange} placeholder="Quiz title..."></input>
                <p> Author: {author}</p>
                <h3>Add outcome <span style={{color: 'red'}} onClick={handleAddOutcomeClick} id="add_outcome">+</span> </h3>

                { outcomesToDisplay }
                { questions.length === 0 ? null : <p>Questions...</p> }
                { questionsToDisplay }
                <input type="submit"></input>
            </form>
            <h3>Add question <span style={{color: 'red'}} onClick={handleAddQuestionClick} id="add_question">+</span> </h3>
            <br></br>
            <button id="build-quiz" onClick={submitQuiz}> Build my quiz!</button>
        </>
    )
}

export default NewTriviaQuiz