import React from 'react';
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

const App = () => {
  return <>
    <h1>Mood Share</h1>
    <Router>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/moods">Current Mood</Link>
        </li>
        <li>
          <Link to="/calendar">Mood Calendar</Link>
        </li>
      </ul>
      <Route path="/login" component={Login}/>
      <Route path="/moods" component={CurrentMoods}/>
      <Route path="/calendar" component={MoodCalendar}/>
      <Route path="/create-account" component={CreateAccount}/>
    </Router>
  </>
};
export default App;
