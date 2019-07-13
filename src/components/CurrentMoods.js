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
      date: "",
      emoji: "",
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  };


  uploadData = (mood, value, emoji) =>
    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('moods')
      .add({
        mood: mood,
        value: value,
        emoji:emoji,
        date: new Date()
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
          <button className="mood-btn current-moods-very-sad" onClick={() => this.setState({mood: "angry", emoji:"😭"})}>
            <span className="emoji--large" role="img" aria-label="Crying Face">😭</span>
            <br/>
            Angry
          </button>
          <button className="mood-btn current-moods-sad" onClick={() => this.setState({mood: "sad", emoji:"😭"})}>
            <span className="emoji--large" role="img" aria-label="Teary Face">😥</span>
            <br/>
            Sad
          </button>
          <button className="mood-btn current-moods-slightly-sad" onClick={() => this.setState({mood: "disappointed", emoji:"😟"})}>
            <span className="emoji--large" role="img" aria-label="Frowning Face">😟</span>
            <br/>
            Disappointed
          </button>
          <button className="mood-btn current-moods-slightly-happy" onClick={() => this.setState({mood: "content", emoji:"😊"})}>
            <span className="emoji--large" role="img" aria-label="Happy Face">😊</span>
            <br/>
            Content
          </button>
          <button className="mood-btn current-moods-happy" onClick={() => this.setState({mood: "happy", emoji:"😃"})}>
            <span className="emoji--large" role="img" aria-label="Wide Smile Face">😃</span>
            <br/>
            Happy
          </button>
          <button className="mood-btn current-moods-very-happy" onClick={() => this.setState({mood: "excited", emoji:"😆"})}>
            <span className="emoji--large" role="img" aria-label="Laughing Face">😆</span>
            <br/>
            Excited
          </button>
        </div>
        <textarea className="current-mood-text" placeholder="Tell me more" value={this.state.value}
                  onChange={this.handleChange}/>
        <button className="submit-btn" onClick={() => this.uploadData(this.state.mood, this.state.value, this.state.emoji)}>Submit
        </button>
      </main>
    );
  }
}
