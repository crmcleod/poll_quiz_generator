import React, { useState, useEffect } from 'react'

const NewTriviaQuiz = () =>{

    const [ questions, setQuestions ] = useState([]);

    const questionsToDisplay = questions.map(() => {
        return(
            <>
                <input type="text" placeHolder="Question..."></input>
                <select>
                    <option>Single answer?</option>
                    <option>Multiple answers?</option>
                </select>
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

    return(
        <>
            <h1> Let's create a new trivia quiz! </h1>
            <form>
                <label for="quiz_name_input"> Quiz title...</label>
                <input id="quiz_name_input" placeholder="Quiz title..."></input>
                { questions.length === 0 ? null : <p>Questions...</p> }
                { questionsToDisplay }
            </form>
            <h3>Add question <span style={{color: "red"}} onClick={handleAddQuestionClick} id="add_question">+</span> </h3>
        </>
    )
}

export default NewTriviaQuiz;