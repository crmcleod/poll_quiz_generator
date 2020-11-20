import React, {useState, useEffect} from 'react'
import NewTriviaQuiz from './Components/newTriviaQuiz'
const NewQuizContainer = (props) =>{

    const [ triviaQuizComponentActive, setTriviaQuizComponentActive ] = useState(false);

    const handleCreateTriviaQuiz = () => {

        setTriviaQuizComponentActive(true);
    }
    if(triviaQuizComponentActive){
        return <NewTriviaQuiz active={triviaQuizComponentActive}/>
    } 
    return(
        <>
            {()=>{

            }}
            <h1>Let's create a new quiz! </h1>
            <h2> What are we trying to make here: </h2>
            <h3> A poll; </h3>
            <h3> A picture quiz; </h3>
            <h3> A personality quiz; </h3>
            <h3 onClick={ handleCreateTriviaQuiz }> A trivia quiz? </h3>
        </>
    )

}

export default NewQuizContainer;