import { render } from '@testing-library/react'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import QuizList from './quizList'
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom'
import ErrorPage from './errorPage'
import Home from './home'
import NewQuizContainer from './newQuizContainer'
import NavBarContainer from './navBarContainer'

const UserHome = ({user}) =>{

    const [ userEmail, setUserEmail ] = useState(user.email)
    const [ userEmailVerified, setUserEmailVerified ] = useState(user.emailVerified)
    const [ userName, setUserName ] = useState();
    const [ userId, setUserId ] = useState();
    const [ quizIds, setQuizIds ] = useState();
    const [ quizNames, setQuizNames ] = useState();
    const [ signUpDetails, setSignUpDetails ] = useState({
        "firstName": null,
        "lastName": null,
        "email": user.email,
        "quizzes": []
    })

    useEffect( async () => {
            
        const result = await axios( `${process.env.REACT_APP_SERVER_URL}/users?email=${userEmail}`)
        if(result.data.length !== 0){
        let quizIds = result.data[0].quizzes.map((quiz) => { return quiz.id})
        let quizNames = result.data[0].quizzes.map((quiz) => { return quiz.quizName})
        let userNameDB = result.data[0].firstName
        setQuizIds(quizIds)
        setQuizNames(quizNames)
        setUserName(userNameDB)}
        setUserId(result.data[0].id)

    }, [userEmail, userEmailVerified, userName])

    const handleFirstNameChange = (event) =>{
        setSignUpDetails({...signUpDetails, firstName: event.target.value})
    }
    const handleLastNameChange = (event) =>{
        setSignUpDetails({...signUpDetails, lastName: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, signUpDetails)
        .then(res => {
            console.log(res);
            console.log(res.data)
            setUserEmailVerified(true)
            setUserName(signUpDetails.firstName)
        })
    }

   if(!userName){
       return(
            <>
                <h1> Looks like this is your first time, let's grab some details to personalise your experience!</h1>
                <form onSubmit={handleSubmit}>
                    <label for="first_name">First name: </label>
                    <input type="text" id="first_name" placeholder="First name" onChange={handleFirstNameChange} value={signUpDetails.first_name}></input>
                    <label for="last_name">Last name: </label>
                    <input type="text" id="last_name" placeholder="Last name" onChange={handleLastNameChange} value={signUpDetails.last_name}></input>
                    <label for="email">Email: </label>
                    <input type="text" id="email" disabled placeholder="Email" value={userEmail}></input>
                    <input type="submit" value="Submit"  />
                </form>
                <h2>{signUpDetails.first_name}{signUpDetails.last_name}</h2>
            </>
       )}
    return(
        <Router>
            <>
              <NavBarContainer />  
                <Switch>
                    <Route exact path="/" 
                        render={() => <Home userDisplayName={userName} />} />
                                        {/* handleExistingQuizzesClick={handleExistingQuizzesClick} />} /> */}
                    <Route path="/quizzes" 
                        render={() => <QuizList ids={quizIds} quizNames={quizNames} />} />
                    <Route path="/new_quiz" 
                        render={() => <NewQuizContainer id={userId} /> } />
                    <Route component={ErrorPage} />
                </Switch>
            </>
        </Router>
    )
}

export default UserHome;