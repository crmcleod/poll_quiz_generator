/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import './App.css'

import firebase from 'firebase/app'

import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth'
import firebaseConfig from './firebaseConfig.js'
import UserHome from './userHome'
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import QuizWidgetContainer from './Containers/quizWidgetContainer'

const firebaseApp = firebase.initializeApp(firebaseConfig)

const firebaseAppAuth = firebaseApp.auth()
const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
}

function App(props) {

    const {
        user, 
        signOut, 
        signInWithGoogle,
    } = props

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/widgets/:type/:id" component={ QuizWidgetContainer } />
                    <Route render={() => <Redirect to='/' />} />
                </Switch>
            </Router>

            <header className="App-header">
                {
                    user 
                        ? <UserHome user={user} />
                        : <p>Please sign in.</p>
                }
                {
                    user
                        ? <button id="sign-out-button" onClick={signOut}>Sign out</button>
                        : <button onClick={signInWithGoogle}>Sign in with Google</button>
                }
            </header>
        </div>
    )
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(App)
