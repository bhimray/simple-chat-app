const express  = require("express")
const app = express();
const {Server} = require("Socket.io");
const cors = require("cors")
const http = require("http")
const bodyParser = require("body-parser")
const dataStore = require('./data')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_DB = process.env.MONGO_DB

//

const schema =require('./graphqlSchema')
const rootValue = require('./graphqlResolvers');

// middlewares
app.use(cors())

//creating server
const server = http.createServer(app)

//creating io
const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        credentials: true,
        methods:["GET", "POST"],
    }
})

//creating usename as attribute for the socket
io.use((socket, next)=>{
    const username = socket.handshake.auth.userName;
    if (!username) throw Error("Username is required");
    socket.username = username;
    console.log(socket.username, 'created socket meta data---------------3')
    next()
})

// setting a connection with the front-end webpage
io.on('connection', async (socket)=>{
    let users = []
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
        userID: id,
        username: socket.username,
        }
        );
        console.log(users,"all users -----------4")
    }
    console.log(users, "all users------------------5")
    socket.emit("users count",users, ()=>{
        console.log("emitter----------------")
    })
    console.log("users are emitted -------------------------6")
    socket.broadcast.emit('user connected', {
        userID: socket.id,
        username: socket.username,
    })
    console.log("users are broadcasted------------9")

    socket.on('sendmessage', (data)=>{
        console.log("we received the message on sever side")
        dataStore.push({user:data['message']})
        console.log(data.message,data.to, socket.id,"is the message received from the client")
        socket.to(data.to).emit('receivedMessage',data.message)
    })

})

//OPENING server at port 5000
server.listen(5000,
    graphqlHTTP({
        schema,
        rootValue
    }),
    ()=>{
    console.log("server is listening from chat.js")
})

mongoose.connect(MONGO_DB).then((res)=>{
    console.log("Mongodb is connected")
}).catch((err)=>{
    console.log(err,"error occured")
})