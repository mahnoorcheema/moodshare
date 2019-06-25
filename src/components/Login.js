import React from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {Link} from 'react-router-dom';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  signIn = async (event) => {
    event.preventDefault();
    await (firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password))
      .catch(function (error) {
        console.log(error.code, error.message);
      });
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.signIn}>
        <h2>Login</h2>
        <label>
          Email:
          <input name="email" type="email" placeholder="email" onChange={this.handleInputChange}/>
        </label>

        <label>
          Password:
          <input name="password" type="password" placeholder="password" onChange={this.handleInputChange}/>
        </label>
        <button className="submit-btn" type="submit">Log In</button>
        Don't have an account? &nbsp;
        <Link to="/create-account">Sign up  </Link>
      </form>)
  };
}