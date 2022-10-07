const User = require('./models')
const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_DB = process.env.MONGO_DB

module.exports = {
    createUser:async( args) =>{
        console.log("request reached to the resolvers")
        console.log(args)
        const user = await User({
            name:args.username,
            emailID:args.emailID
        })
        mongoose.connect(MONGO_DB).then(()=>{
            user.save
        }).catch((err)=>{
            console.log("Error ocurred while saving", err)
        })

    },
    login:async( args) =>{
        console.log(args)
        const emailID = args.emailID;
        const existingUser = User.findOne({emailID:emailID})
        if (existingUser){
            console.log("user exist------------- resolvers")
        }

    }
}