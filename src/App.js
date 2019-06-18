import React from 'react';
import './App.css';

function App() {
  return (
    <div >
      <h1>How are you feeling today?</h1>
      <div className="current-moods">
        <button className="mood-btn current-moods-very-sad">
          <span className="emoji--large" role="img" aria-label="Crying Face">😭</span>
          <br/>
          Very Sad
        </button>
        <button className="mood-btn current-moods-sad">
          <span className="emoji--large" role="img" aria-label="Teary Face">😥</span>
          <br/>
          Sad
        </button>
        <button className="mood-btn current-moods-slightly-sad">
          <span className="emoji--large" role="img" aria-label="Frowning Face">😟</span>
          <br/>
          Slightly Sad
        </button>
        <button className="mood-btn current-moods-slightly-happy">
          <span className="emoji--large" role="img" aria-label="Happy Face">😊</span>
          <br/>
          Slightly Happy
        </button>
        <button className="mood-btn current-moods-happy">
          <span className="emoji--large" role="img" aria-label="Wide Smile Face">😃</span>
          <br/>
          Happy
        </button>
        <button className="mood-btn current-moods-very-happy">
          <span className="emoji--large" role="img" aria-label="Laughing Face">😆</span>
          <br/>
          Very Happy
        </button>
      </div>
    </div>

  );
}

export default App;
