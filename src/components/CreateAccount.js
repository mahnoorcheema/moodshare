import React from 'react';
import "./CreateAccount.css"
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default class CreateAccount extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name:"",
      email:"",
      password:"",
    };
  };

  createAccount = async (event) => {
    event.preventDefault();
    const db = firebase.firestore();
    await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((cred) => db.collection('users').doc(cred.user.uid).set({
        name: this.state.name,
      }))
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
      <form className="account-form" onSubmit={this.createAccount}>
        <h2>Create Account</h2>
        <label>Name:
          <input name="name" type="text" placeholder="name" onChange={this.handleInputChange}/>
        </label>
        <label>Email:
          <input name="email" type="email" placeholder="email" onChange={this.handleInputChange}/>
        </label>
        <label>Password:
          <input name="password" type="password" placeholder="password" onChange={this.handleInputChange}/>
        </label>
        <button className="submit-btn" type="submit">Sign Up</button>
      </form>
    );
  }
}