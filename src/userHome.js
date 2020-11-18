import { render } from '@testing-library/react'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import QuizList from './quizList'

const UserHome = ({user}) =>{

    const [ userEmail, setUserEmail ] = useState(user.email)
    const [ userEmailVerified, setUserEmailVerified ] = useState(user.emailVerified)
    const [ userDisplayName, setUserDisplayName ] = useState(user.displayName)
    const [ quizIds, setQuizIds ] = useState();
    const [ existingQuizzesVisible, setExistingQuizzesVisible ] = useState(false);

    useEffect( async () => {
            
        const result = await axios( `${process.env.REACT_APP_SERVER_URL}/users?email=${userEmail}`)
        let quizIds = result.data[0].quizzes.map((quiz) => { return quiz.id})
        setQuizIds(quizIds)

    }, [userEmail])

    const handleExistingQuizzesClick = () =>{
        setExistingQuizzesVisible(true);
    }
    if(!existingQuizzesVisible){
    return(
        <>
            <h1> Welcome to the quiz generatorrrrr, quizzards! </h1>
            <h2>{userDisplayName} get started with a new quiz or change an existing one. </h2>
            <label for="existing-quizzes"></label>
            <button onClick={ handleExistingQuizzesClick } id="existing-quizzes">View existing quizzes</button>
        </>
    )}
    else if(existingQuizzesVisible){
        return(
            <>
                <h1> Here are you existing quizzes</h1>
                <QuizList ids={quizIds}/>
            </>
        )
    }

}

export default UserHome;