const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_DB = process.env.MONGO_DB
const msgContainer = require('./msgContainer')

const connectDB = async()=>{ await mongoose.connect(MONGO_DB).then((res)=>{
    console.log("Mongodb is connected")
    const senderEmail = msgContainer.updateOne({receiverEmailID:'chunchun@gmail.com', senderEmailID:"nagmani@gmail.com"},
    {
        $push: {
          messageArray: {
             $each: [ { message: "this is new message"}],
          }
        }
      }
      ,(err, docs)=>{
        if (err) return console.log(err);
        console.log(docs, "this is docs asshole");
        // senderEmail.update({receiverEmailID:'chunchun@gmail.com', senderEmailID:"nagmani@gmail.com"}, {$push: {message:"there you go" }});

    })
    // console.log(senderEmail,"this is senderEmail")
    try{
        console.log(senderEmail.senderEmailID)
        const newMessenger = new msgContainer({
            receiverEmailID:"chunchun@gmail.com",
            senderEmailID:"xoti@gmail.com",
            message:"hello vaiya"
        }) 
        newMessenger.save()
    }catch (err){
        console.log("err occured")
    }
}).catch((err)=>{
    console.log(err,"error occured")
})}
connectDB();

