import React, {useState} from 'react'
import io from 'socket.io-client'
import User from './user'

const socket = io.connect('http://localhost:5000')

const UserRoom = () => {
    const [roomName, setRoomName] = useState('')
    const [showRegister, setShowRegister] = useState(true)
    console.log(socket,"this is new socket/new user")
    const Createroom =()=>{
        if (roomName !== ''){
            console.log(roomName, socket.id)
            socket.emit('create-room',roomName)
            setShowRegister(false)
        }
    }

  return (
    <div>
        {showRegister?
        <>
        <input placeholder='Create room' onChange={(event)=>setRoomName(event.target.value)}/>
        <button type='submit' onClick={Createroom}>Create Room</button>
        </>
        :
        <User socket={socket} roomName={roomName}/>
        }
    </div>
  )
}

export default UserRoom