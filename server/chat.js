const express  = require('express')
const app = express();
const {Server} = require("Socket.io");
const cors = require('cors')
const http = require("http")

// middlewares
app.use(cors())

//creating server
const server = http.createServer(app)

//creating io
const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET", "POST"],
    }
})

// creating link
// app.get('/', ()=>{
    
// })

// setting a connection with the front-end webpage
io.on('connection', (socket)=>{
    console.log(socket.id, "user is connected now");

    socket.on('create-room', (data)=>{
        console.log(data,socket.id, 'this is room name')
        socket.join(data)
    })

    socket.on('sendmessage', (data)=>{
        console.log("we received the message on sever side")
        console.log(data['message'],data['roomName'], socket.id,"is the message received from the client")
        socket.to(data['roomName']).emit('receivedMessage',data.message)
    })

    socket.on('disconnect', ()=>{
        console.log("User is disconnected", socket.id);
    })

})





//OPENING server at port 5000
server.listen(5000, ()=>{
    console.log("server is listening from chat.js")
})