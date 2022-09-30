import React from 'react'
import './Chat.css'
import { useEffect } from 'react'
import { useState } from 'react'
import io from 'socket.io-client'   
let j=0;
let msgContainer= []
const Chat = ({socket, userName, roomName}) => {
    const [message, fillMessage]= useState('')
    const [receivedMessage, setReceivedMessage] = useState([])
    // const [testArray, setTestArray] = useState([])
    // msgContainer= [...receivedMessage]
    // console.log(testArray,"this is test array")
    console.log(receivedMessage, "received-message")
    console.log(j++, "j")
    // console.log(`typed message by ${socket.id} is ${message}`)
    // const [roomName, setRoomName] = useState('')
    // const [receivedMessage, setReceivedMessage] = useState([])
    // console.log(receivedMessage, message)

    //conneting to the server
    // const Createroom =()=>{
    //     if (roomName !== ''){
    //         console.log(roomName, socket.id)
    //         socket.emit('create-room',roomName)
    //     }
    // }
    const sendMessage=async(e)=>{
        e.preventDefault()
        // console.log("we received the message to send to server")
        // console.log(message, socket.id,roomName, 'while sending the input  message')
        fillMessage("")
        await socket.emit('sendmessage',{message, roomName})
        setReceivedMessage([...receivedMessage, message])
        
        // setTestArray((value)=>[...value, "A"])
    }
    useEffect(()=>{
        socket.on('receivedMessage', (data)=>{
            // console.log(receivedMessage, data, `${socket.id} is the socket id`)
            setReceivedMessage((prev)=>[...prev, data])
            // console.log(data, "message returned in useeffect")
            // setTestArray((value)=>[...value, "A"])
            // console.log(`received message by ${socket.id} is ${data['message']}`)
        })
    }, [])
  return (
    <div>
       <div className='chathead-section'>
        <div className='status'></div>
        {/* <div className='name'>{userName}</div> */}
        <div className='close-btn btn'></div>
       </div>
       <div className='chatbox-section'>
        <div className="user right">
            <div className='message'>{receivedMessage.map((bit, i)=><div key={i}>{bit}</div>)}</div>
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