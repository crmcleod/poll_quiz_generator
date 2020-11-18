import './App.css';

import firebase from "firebase/app";

import withFirebaseAuth from 'react-with-firebase-auth'
import "firebase/auth";
import firebaseConfig from './firebaseConfig.js';
import UserHome from './userHome';


const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

function App(props) {

  const {
    user, 
    signOut, 
    signInWithGoogle,
  } = props;

  console.log(signInWithGoogle, user)
  return (
    <div className="App">
    <header className="App-header">
      {
        user 
          ? <UserHome user={user} />
          : <p>Please sign in.</p>
      }
      {
        user
          ? <button onClick={signOut}>Sign out</button>
          : <button onClick={signInWithGoogle}>Sign in with Google</button>
      }
    </header>
  </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
