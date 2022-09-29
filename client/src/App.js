import React from 'react';
import './App.css';
import Chat from './components/chat/Chat';
import Room from './components/room/Room';
import User from './components/user';
import UserRoom from './components/UserRoom';

let app=0
function App() {
  console.log(app++, "app")
  return (
    <div className="App">
      <Room/>
    </div>
  );
}

export default App;
