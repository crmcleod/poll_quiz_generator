import React, { useState, useEffect } from 'react'
import axios from 'axios'

const NewTriviaQuiz = ({author}) =>{

    const [ questions, setQuestions ] = useState([]);
    const [ outcomes, setOutcomes ] = useState([]);
    const [ quizAuthor, setQuizAuthor ] = useState();
    const [ quizObject, setQuizObject ] = useState({
        quizName: "",
        quizAuthor: author,
        questions: [{questions}],
        outcomes: [],
        user: {
            id: 1
        }
    });

    const outcomesToDisplay = outcomes.map(() =>{
        return(
            <>
                <br></br>
                <input type="text" placeholder="Outcome name / number..."></input>
                <input type="text" placeholder="Outcome..."></input>
            </>
        )
    })

    const questionsToDisplay = questions.map(() => {
        return(
            <>
                <br></br>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <input type="text" placeHolder="Question..."></input>
                    <input type="text" placeHolder="Question number..."></input>
                    <select>
                        <option>Single answer?</option>
                        <option>Multiple answers?</option>
                    </select>
                    <input type="text" placeholder="Answer..."></input>
                    <input type="text" placeholder="Answer..."></input>
                    <input type="text" placeholder="Answer..."></input>
                    <input type="text" placeholder="Answer..."></input>
                    
                </div>
            </>
        )
    })

    const handleAddQuestionClick = () =>{
        const newQuestions = questions.map( (question) =>{
            return question;
        });

        newQuestions.push({})
        setQuestions(newQuestions);

    }
    const handleAddOutcomeClick = () =>{
        const newOutcomes = outcomes.map( (outcome) =>{
            return outcome;
        });

        newOutcomes.push({})
        setOutcomes(newOutcomes);

    }

    const handleQuizNameChange = (event) => {
        setQuizObject({...quizObject, quizName: event.target.value})
        console.log(event.target.value)
    }

    const handleQuestionSubmit = (event) =>{
        event.preventDefault();
        setQuizObject({...quizObject, "questions": [
            {   questionNumber: event.target[2].value,
                questionBody: event.target[1].value,
                correctAnswer: false,
                quiz: {
                    id: 2
                },
                answers: [{
                    answerNumber: 1,
                    answerBody: event.target[4].value,
                    question: {
                        id: 2
                    }
                },
                {
                    answerNumber: 2,
                    answerBody: event.target[5].value,
                    question: {
                        id: 2
                    }

                },
                {
                    answerNumber: 3,
                    answerBody: event.target[6].value,
                    question: {
                        id: 2
                    }

                },
                {
                    answerNumber: 4,
                    answerBody: event.target[7].value,
                    question: {
                        id: 2
                    }

                }]
             }
        ]})
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
                <label for="quiz_name_input"> Quiz title...</label>
                <input id="quiz_name_input" value={quizObject.quizName} onChange={handleQuizNameChange} placeholder="Quiz title..."></input>
                <p> Author: {author}</p>
                <h3>Add outcome <span style={{color: "red"}} onClick={handleAddOutcomeClick} id="add_outcome">+</span> </h3>

                { outcomesToDisplay }
                { questions.length === 0 ? null : <p>Questions...</p> }
                { questionsToDisplay }
                <input type="submit"></input>
            </form>
            <h3>Add question <span style={{color: "red"}} onClick={handleAddQuestionClick} id="add_question">+</span> </h3>
            <br></br>
            <button id="build-quiz" onClick={submitQuiz}> Build my quiz!</button>
        </>
    )
}

export default NewTriviaQuiz;