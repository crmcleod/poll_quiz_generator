/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import QuizList from './quizList'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ErrorPage from './errorPage'
import Home from './home'
import NewQuizContainer from './Containers/newQuizContainer'
import NavBarContainer from './Containers/navBarContainer'
import QuizWidgetContainer from './Containers/quizWidgetContainer'
import NewTriviaQuiz from './Components/newTriviaQuiz'
import NewPoll from './Components/newPoll'

const UserHome = ({ user }) =>{

    const [ userEmail ] = useState(user.email)
    const [ userEmailVerified, setUserEmailVerified ] = useState(user.emailVerified)
    const [ userName, setUserName ] = useState()
    const [ userId, setUserId ] = useState()
    const [ quizIds, setQuizIds ] = useState()
    const [ quizNames, setQuizNames ] = useState()
    const [ signUpDetails, setSignUpDetails ] = useState({
        'firstName': null,
        'lastName': null,
        'email': user.email,
        'quizzes': []
    })

    useEffect( () => {
            
        axios.get( `${process.env.REACT_APP_SERVER_URL}/users?email=${userEmail}`)
            .then(res => {
                if(res.data.length !== 0){
                    let quizIds = res.data[0].quizzes.map((quiz) => { return quiz.id})
                    let quizNames = res.data[0].quizzes.map((quiz) => { return quiz.quizName})
                    let userNameDB = res.data[0].firstName
                    setQuizIds(quizIds)
                    setQuizNames(quizNames)
                    setUserName(userNameDB)
                    setUserId(res.data[0].id)}})

    }, [ userEmail, userEmailVerified, userName ])

    const handleFirstNameChange = ( event ) =>{
        setSignUpDetails({ ...signUpDetails, firstName: event.target.value })
    }
    const handleLastNameChange = ( event ) =>{
        setSignUpDetails({ ...signUpDetails, lastName: event.target.value })
    }

    const handleSubmit = ( event ) => {
        event.preventDefault()
        axios.post( `${process.env.REACT_APP_SERVER_URL}/users`, signUpDetails )
            .then( res => {
                console.log( res )
                console.log( res.data )
                setUserEmailVerified( true )
                setUserName( signUpDetails.firstName )
            })
    }

    if( !userName ){
        return(
            <>
                <h1> Looks like this is your first time, let's grab some details to personalise your experience!</h1>
                <form onSubmit={ handleSubmit }>
                    <label htmlFor="first_name">First name: </label>
                    <input type="text" id="first_name" placeholder="First name" onChange={handleFirstNameChange} value={signUpDetails.first_name}></input>
                    <label htmlFor="last_name">Last name: </label>
                    <input type="text" id="last_name" placeholder="Last name" onChange={handleLastNameChange} value={signUpDetails.last_name}></input>
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" disabled placeholder="Email" value={userEmail}></input>
                    <input type="submit" value="Submit"  />
                </form>
                <h2>{ signUpDetails.first_name }{ signUpDetails.last_name }</h2>
            </>
        )}
    return(
        <Router>
            <>
                <NavBarContainer />  
                <Switch>
                    <Route exact path="/" 
                        render={() => <Home userDisplayName={ userName } />} />
                    <Route path="/widgets" component={ QuizWidgetContainer } />
                    <Route path="/quizzes"
                        render={() => <QuizList
                            ids={ quizIds }
                            names={ quizNames }
                        />} />
                    <Route exact path="/new_quiz" 
                        render={() => <NewQuizContainer 
                            id={userId} 
                            author={userName} /> } />
                    <Route path="/new_quiz/trivia" 
                        render={() => <NewTriviaQuiz 
                            id={userId} 
                            author={userName} /> }/>
                    <Route path="/new_quiz/poll" 
                        render={() => <NewPoll
                            id={userId} 
                            author={userName} /> }/>
                    <Route component={ErrorPage} />
                </Switch>
            </>
        </Router>
    )
}

export default UserHome