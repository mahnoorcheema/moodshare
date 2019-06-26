import React, {useState, useEffect} from 'react';
import './App.css';
import firebase from 'firebase/app';
import "firebase/firestore";
import firebaseConfig from './firebaseConfig.json'
import CurrentMoods from "./components/CurrentMoods";
import Login from "./components/Login";
import {Route, Link, BrowserRouter as Router} from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import MoodCalendar from "./components/MoodCalendar"


firebase.initializeApp(firebaseConfig);

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => firebase.auth().onAuthStateChanged(setUser), []);
  return user;
};

const AuthenticatedRoute = ({ component: Component, user,...rest }) => (
  <Route {...rest} render={(props) => (
    user
      ? <Component {...props} />
      : <main>
        Looks like you've signed out, please <Link to="/login">login again</Link>.
      </main>
  )} />
);

// const SignOut = async () => {
//   firebase.auth().signOut().then(function () {
//     console.log("sign out successful")
//   }).catch(function (error) {
//     console.log(error.code, error.body);
//   })
// };

//Todo: Implement logout function
const App = () => {
  const user = useCurrentUser();

  return <>
    <Router>
      <nav>
        <ul className="nav-bar">
          <h1>M☺☻d Share</h1>
          <li>
            {!user ?
            <Link to="/login" className="nav-bar-element">Login</Link>
            : <Link to="/login" className="nav-bar-element">Logout</Link>}
          </li>
          <li>
            <Link to="/calendar" className="nav-bar-element">Mood Calendar</Link>
          </li>
        </ul>
      </nav>
      <Route path="/login" component={Login}/>
      <Route path="/create-account" component={CreateAccount}/>

      <AuthenticatedRoute user={user} path="/moods" component={CurrentMoods}/>
      <AuthenticatedRoute user={user} path="/calendar" component={MoodCalendar}/>
    </Router>
  </>
};
export default App;
