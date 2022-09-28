import React from 'react'
import './Chat.css'
import { useEffect } from 'react'
import { useState } from 'react'
import io from 'socket.io-client'   

const Chat = ({socket, userName, roomName}) => {
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
        socket.emit('sendmessage',{message})
    }
    useEffect(()=>{
        socket.on('receivedMessage', (data)=>{
            console.log(data, `${socket.id} is the socket id`)
            setReceivedMessage(data)
        })
    }, [socket])
  return (
    <div>
       <div className='chathead-section'>
        <div className='status'></div>
        {/* <div className='name'>{userName}</div> */}
        <div className='close-btn btn'></div>
       </div>
       <div className='chatbox-section'>
        <div className="user right">
            <div className='message'>{receivedMessage}</div>
            {/* <div className='time'>{time}</div> */}
        </div>
        {/* <div className="user left">
            <div className='message'>{message}</div>
            <div className='time'>{time}</div>
        </div> */}
       </div>
       <div className='send-section'>
        <input placeholder='type a message here...' onChange={(event)=>fillMessage(event.target.value)}></input>
        <button className='send-btn' onClick={sendMessage}>Send</button>
       </div>
    </div>
  )
}

export default Chat