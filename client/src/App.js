import React from 'react';
import './App.css';
import Chat from './components/chat/Chat';
import Room from './components/room/Room';
import User from './components/user';
import UserRoom from './components/UserRoom';


function App() {
  return (
    <div className="App">
      <UserRoom/>
    </div>
  );
}

export default App;
