import React from 'react';
import firebase from 'firebase/app';
import "firebase/firestore";

export default class ShareCalendarForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  addViewer = async(event)=> {
    event.preventDefault();
    return firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({viewers: firebase.firestore.FieldValue.arrayUnion(this.state.email)})
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  render(){
    return(
      <form onSubmit={this.addViewer}>
        <label>
          Enter Email:
          <input name="email" type="email" placeholder="email" onChange={this.handleInputChange}/>
        </label>
        <button type="button" onClick={this.resetForm}>X</button>
        <button type="submit">✔</button>
      </form>
    );
  }
}