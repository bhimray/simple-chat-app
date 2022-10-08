import React, { useState } from 'react'
import './Room.css'
import io from 'socket.io-client'
import Chat from '../chat/Chat'
import axios from 'axios'
// import {useQuery} from 'react-query'
import {useQuery, gql, useMutation} from '@apollo/client' 
const socket = io('http://localhost:5000', {autoConnect:false}) // always keep this one out of function component
let i=0;



const Room = () => {
  console.log(i++, "i")
  const [userName, setUserName] = useState('')
  const [emailID, setEmailID] = useState('')
  const [showRegister, setShowRegister] = useState(true)
  console.log(userName, "this is username----1")

  let saveUser = gql`
    mutation createUser($name:String, $email: String!) {
        createUser(name:$name, emailID: $email) {
          name
          emailID
        }
      }
  `;

  const createSocketConnection= (event)=>{
    event.preventDefault()
    if(event.key === 'Enter'){
      console.log(event, "this is event-----2")
      setShowRegister(false);
      socket.auth = {userName, emailID}
      console.log(socket.auth, userName)
      socket.connect()
    }
  }


  // const serverSite =async()=>await fetch('http://localhost:5000', {
  //   method: 'POST',
  //   body: JSON.stringify(saveUser),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }).then((res)=>{
  //   console.log(res, "data")
  // }).catch((err)=>{
  //   console.log(err, "this is error")
  // })
  // serverSite()
  // const {data, isLoading, isError, error} = useMutation(saveUser, 
  //   {variables:{
  //     email: emailID,
  //     name:userName 
  // }})
  // if (isLoading) console.log("isLoading--------------")
  // if (!isLoading) console.log(data, "loaded data............")


  return (
    <>
    {showRegister?
    <div className='room-wrapper' >
        <div className="r-room" ><input placeholder="username" className="r-roomName" onChange={(e)=> setUserName(e.target.value)} /></div>
        <div className="r-name"><input placeholder='email' type="text" className="r-userName" onChange={(event)=>setEmailID(event.target.value)} onKeyPress={(event)=>{event.key === "Enter" && createSocketConnection(event)}}/></div>
        <div className="r-button" onKeyPress={(event)=>{event.key === "Enter" && createSocketConnection(event)}}><button className="btn">Connect</button></div>
    </div>:
    <Chat socket={socket} userName={userName} />
    }
    </>
  )
}

export default Room