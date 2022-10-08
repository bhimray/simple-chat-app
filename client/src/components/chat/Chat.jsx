import React from 'react'
import './Chat.css'
import { useEffect } from 'react'
import { useState } from 'react'
import io from 'socket.io-client'  
import {useQuery, gql} from '@apollo/client' 
let j=0;
let msgContainer= []


const Chat = ({socket}) => {
    const [message, fillMessage]= useState('')
    const [receivedMessage, setReceivedMessage] = useState([])
    const [user, addUser] = useState([])
    const [selectUser, setSelectUser] = useState('')
    console.log(user,"this is user list")
    console.log(receivedMessage, "received-message")
    console.log(j++, "j")
    const sendMessage=async(e)=>{
        e.preventDefault()
        console.log(message, "-----------------------content")
        console.log(user.userID, user.emailID,"-----------------*****+++++++++++++userID")
        await socket.emit('sendmessage',{
            message,
            from:socket.id,
            to:selectUser,
        })
        setReceivedMessage((prev)=>[...prev, message])
    }  
    const sortingFunction=(users)=>{
        console.log(users, "users--------------7################")
        users.forEach(element => {
            element.self = element.userID === socket.id              
        }
        );
        console.log(users, "current users---------8")
        const selfUser = users.find((user)=> {if (user.self === true) return user}) //self is the meta data created using the element.self in forEach function
        const otherUser = users.filter((user)=> {if (user.self !== true) return user}) 
        const allUser= [selfUser, ...otherUser]
        if (user.length != 0){
            addUser((prev)=>[allUser, ...prev]);
        }
        addUser(allUser)
    }

    useEffect(()=>{
        socket.on('receivedMessage', (data)=>{
            // console.log(receivedMessage, data, `${socket.id} is the socket id`)
            setReceivedMessage((prev)=>[...prev, data])
            console.log(data, "message returned in useeffect--------------------11")
        })
        socket.on('user connected', (user)=>{
            console.log("broadcasting the user ---------------10")
            console.log(user, "users after making connection--------------10#")
            addUser((prev)=>[...prev, user])
        })

        socket.on('users count', async (users)=>{
            console.log(users, "users--------------7################")
            users.forEach(element => {
                element.self = element.userID === socket.id              
            }
            );
            console.log(users, "current users---------8")
            const selfUser = users.find((user)=> {if (user.self === true) return user}) //self is the meta data created using the element.self in forEach function
            const otherUser = users.filter((user)=> {if (user.self !== true) return user}) 
            const allUser= [selfUser, ...otherUser]
            if (user.length != 0){
                addUser((prev)=>[allUser, ...prev]);
            }
            addUser(allUser)
            console.log("array is sorted and assign to the state as below", allUser)
        })
        

    }, [socket])
    console.log(user,"these are user after broadcasting----------------11")

    const to=(user)=>{
        setSelectUser(user)
    }
  return (
    <div style={{display:"flex"}}>
        <div className="users-list left-container">
            <div>
                {user.map((user)=>{
                    return(
                        <div className="single-user">
                            <div className="user-name" onClick={()=>setSelectUser(user.userID)}>{user.username}</div>
                            <div className="user-id">{user.emailID}</div>
                        </div>
                    )
                })}
            </div>
        </div>
        <div className="right-container">
            <div className='chathead-section'>
                <div className='status'></div>
                <div className='name'>{console.log(Object.values(user),"------------------this is html")}</div>
                <div className='close-btn btn'></div>
            </div>
            <div className='chatbox-section'>
                <div className="user right">
                    <div className='message'>{receivedMessage.map((bit, i)=><div key={i}>{bit}</div>)}</div>
                    {/* <div className='time'>{time}</div> */}
                </div>
            </div>
            <div className='send-section'>
                <input placeholder='type a message here...' onChange={(event)=>fillMessage(event.target.value)} onKeyPress={(event)=>{event.key === "Enter" && sendMessage(event)}}></input>
                <button className='send-btn' onClick={sendMessage}>Send</button>
            </div>
       </div>
    </div>
  )
}


export default Chat