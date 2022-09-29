import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
// import io from 'socket.io-client'

// const socket = io.connect('http://localhost:5000') // always keep this one out of function component

const User = ({socket, roomName}) => {
    // console.log(socket, "this is received socket")
    const [message, fillMessage]= useState('')
    // const [roomName, setRoomName] = useState('')
    const [receivedMessage, setReceivedMessage] = useState('')
    // console.log(message)

    //conneting to the server
    // const Createroom =()=>{
    //     if (roomName !== ''){
    //         console.log(roomName, socket.id)
    //         socket.emit('create-room',roomName)
    //     }
    // }
    const sendMessage=()=>{
        console.log(message, socket.id)
        socket.emit('sendmessage',{message, roomName})
    }
    useEffect(()=>{
        socket.on('receivedMessage', (data)=>{
            console.log(data, `${socket.id} is the socket id`)
            setReceivedMessage(data)
        })
    }, [socket])
  return (
    <div>
        {/* <input placeholder='Create room' onChange={(event)=>setRoomName(event.target.value)}/>
        <button type='submit' onClick={Createroom}>Create Room</button> */}
        <label>Type a message here:</label>
        <input placeholder="type message" onChange={(event)=>fillMessage(event.target.value)}></input>
        <button type="submit" onClick={sendMessage}>Send Message</button>
        <br/>
        <br/>
        <div>{receivedMessage}</div>
        
    </div>
  )
}

export default User