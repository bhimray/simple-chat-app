const graphql = require('graphql')
const {buildSchema} = require('graphql')

module.exports = buildSchema(`
    type user{
        name:String
        email:String
    }
    input userInput{
        name:String
        email:String
    }
    type RootQuery{
        login(user:userInput):user
    }
    type RootMutation{
        createUser(user:userInput):user
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`)

