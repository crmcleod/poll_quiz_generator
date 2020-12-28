/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TriviaQuestion from './triviaQuestion'
import TriviaOutcome from './triviaOutcome'

const NewTriviaQuiz = ({ author }) =>{

    const [ questionSchema, setQuestionSchema ] = useState({
        questionNumber: 0,
        questionBody: '',
        correctAnswer: false,
        quiz: {},
        answers: []
    })
    const [ outcomeSchema, setOutcomeSchema ] = useState({
        outcomeName: '',
        outcomeBody: '',
        conditionComparator: '',
        conditionValue: null,
        quiz: {}
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
    const [ triviaQuizCreated, setTriviaQuizCreated ] = useState( false )

    const postQuizToGetID = () => {
        axios.post(`${ process.env.REACT_APP_SERVER_URL }/quizzes`, quizObject)
            .then( res => setQuizID(res.data.id))
    }

    useEffect( () => {
        postQuizToGetID()
    }, [])

    const outcomesToDisplay = outcomes.map(( outcome ) =>{
        return(
            <>
                <br></br>
                <TriviaOutcome 
                    key={ outcome.id } 
                    outcomeID={ outcome.id } 
                    quizID={ quizID }
                    quizObject={ quizObject }
                    setQuizObject={ setQuizObject }
                />
            </>
        )
    })

    const questionsToDisplay = questions.map(( question ) => {
        return(
            <>
                <br></br>
                <TriviaQuestion 
                    key={ question.id } 
                    questionId={ question.id } 
                    quizID={ quizID } 
                    quizObject={ quizObject }
                    setQuizObject={ setQuizObject }
                />
            </>
        )
    })


    const handleAddQuestionClick = async () =>{
        const prevQuestions = [ ...questions ]
        const newSchemaWithQuizID = { ...questionSchema, quiz: { id: quizID } }
        await axios.post( `${process.env.REACT_APP_SERVER_URL}/questions`, newSchemaWithQuizID )
            .then( res => (prevQuestions.push( {...newSchemaWithQuizID, id: res.data.id } )))
        setQuestions(prevQuestions)
        setQuestionSchema(newSchemaWithQuizID)
    }

    const handleAddOutcomeClick = async () =>{
        const newOutcomes = [ ...outcomes ]
        const newOutcomeSchemaWithQuizID = { ...outcomeSchema, quiz: { id: quizID }}
        await axios.post( `${process.env.REACT_APP_SERVER_URL}/outcomes`, newOutcomeSchemaWithQuizID )
            .then( res => ( newOutcomes.push({ ...newOutcomeSchemaWithQuizID, id: res.data.id })))
        setOutcomes( newOutcomes )
        setOutcomeSchema( newOutcomeSchemaWithQuizID )
    }

    const handleQuizNameChange = (event) => {
        setQuizObject({...quizObject, quizName: event.target.value})
        axios.put(`${process.env.REACT_APP_SERVER_URL}/quizzes/${quizID}`, quizObject)
    }

    const submitQuiz = () => {
        axios.put(`${process.env.REACT_APP_SERVER_URL}/quizzes/${quizID}`, quizObject)
        setTriviaQuizCreated( true )
    }

    return(
        <>
            <h1> Let's create a new trivia quiz! </h1>
            <p>{quizObject.quizName}</p>
            <label htmlFor="quiz_name_input"> Quiz title...</label>
            <input id="quiz_name_input" value={quizObject.quizName} onChange={ handleQuizNameChange } placeholder="Quiz title..."></input>
            <p> Author: {author}</p>
            { outcomesToDisplay }
            <h3>Add outcome <span style={{ color: 'red' }} onClick={ handleAddOutcomeClick } id="add_outcome">+</span> </h3>
            { questions.length === 0 ? null : <p>Questions...</p> }
            { questionsToDisplay }
            <input type="submit"></input>
            <h3>Add question <span style={{color: 'red'}} onClick={ handleAddQuestionClick } id="add_question">+</span> </h3>
            <br></br>
            <button id="build-quiz" onClick={submitQuiz}> Build my quiz!</button>
            { triviaQuizCreated && <h2><a href={'http://localhost:3000/widgets/quiz/'+ quizID}> {'http://localhost:3000/widgets/quiz/'+ quizID} </a></h2>}
        </>
    )
}

export default NewTriviaQuiz