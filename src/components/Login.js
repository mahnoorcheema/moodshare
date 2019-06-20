import React from 'react';
import * as firebase from "firebase";


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
    await (firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password));

    const user = firebase.auth().currentUser;
    if (user) {
      console.log("user is signed in")
    }
    else{
      console.log("error logging in");
    }
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
      <form onSubmit={this.signIn}>
        <h2>Login</h2>
        <label>Email: </label>
        <input name="email" type="username" onChange={this.handleInputChange}/>
        <label>Password: </label>
        <input name="password" type="password" onChange={this.handleInputChange}/>
        <button type="submit">Submit</button>
      </form>)
  };
}