const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

const schema = require('./schema/schema')
const envs = require('./configs/envs')

const app = express()
const PORT = process.env.PORT || 4000

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, async() => {
    await mongoose.connect(envs.mongoURI, {useNewUrlParser: true})
    console.log(`Listening on port ${PORT}`)
})