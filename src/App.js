import React from 'react';
import Chat from './components/Chat';
import Player from './components/MusicPlayer';
import './app.css';

function App() {
  return (
    <div className="App">
      <div className="chatArea">
        <Chat/>
      </div>
      <div className="divider"></div>
      <div className="youtubeArea">
        <Player/>
      </div>
    </div>
  );
}

export default App;