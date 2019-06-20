import React from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import './CurrentMoods.css';

export default class CurrentMoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: "",
      value: "",
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  };

  uploadData = (mood, value) =>
    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('moods')
      .doc()
      .set({
        mood: mood,
        value: value
      }).then(function () {
      console.log("Document successfully written");
    }).catch(function (error) {
      console.log("Error writing document: ", error);
    });

  render() {
    return (
      <main className="current-moods-page">
        <h2>How are you feeling today?</h2>
        <div className="current-moods">
          <button className="mood-btn current-moods-very-sad" onClick={() => this.setState({mood: "angry"})}>
            <span className="emoji--large" role="img" aria-label="Crying Face">😭</span>
            <br/>
            Angry
          </button>
          <button className="mood-btn current-moods-sad" onClick={() => this.setState({mood: "sad"})}>
            <span className="emoji--large" role="img" aria-label="Teary Face">😥</span>
            <br/>
            Sad
          </button>
          <button className="mood-btn current-moods-slightly-sad" onClick={() => this.setState({mood: "disappointed"})}>
            <span className="emoji--large" role="img" aria-label="Frowning Face">😟</span>
            <br/>
            Disappointed
          </button>
          <button className="mood-btn current-moods-slightly-happy" onClick={() => this.setState({mood: "content"})}>
            <span className="emoji--large" role="img" aria-label="Happy Face">😊</span>
            <br/>
            Content
          </button>
          <button className="mood-btn current-moods-happy" onClick={() => this.setState({mood: "happy"})}>
            <span className="emoji--large" role="img" aria-label="Wide Smile Face">😃</span>
            <br/>
            Happy
          </button>
          <button className="mood-btn current-moods-very-happy" onClick={() => this.setState({mood: "excited"})}>
            <span className="emoji--large" role="img" aria-label="Laughing Face">😆</span>
            <br/>
            Excited
          </button>
        </div>
        <textarea className="current-mood-text" placeholder="Tell me more" value={this.state.value}
                  onChange={this.handleChange}/>
        <button className="submit-btn" onClick={() => this.uploadData(this.state.mood, this.state.value)}>Submit
        </button>
      </main>
    );
  }
}
