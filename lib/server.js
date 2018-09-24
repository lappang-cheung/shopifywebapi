// Required modules
const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

// Load the GraphQL schema
const schema = require('./schema/schema')
// Loading MongoURI env
const envs = require('./configs/envs')
// Declaring and initial the app
const app = express()
const PORT = process.env.PORT || 4000

// Setup the GraphQL route
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

// Connecting with mongo through the environment port
app.listen(PORT, async() => {
    await mongoose.connect(envs.mongoURI, {useNewUrlParser: true})
    console.log(`Listening on port ${PORT}`)
})