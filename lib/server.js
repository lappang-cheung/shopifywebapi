const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressGraphQL = require('express-graphql')

const env = require('./api/configs/env')

const app = express()
const PORT = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/healthcheck', async (req, res, next) => {
    const docs = await {message: 'API server online'}
    res.status(200).send(docs)
})

app.listen(PORT, async() => {
    await mongoose.connect(env.mongoURI, {useNewUrlParser: true})
    console.log(`Listening on port ${PORTnpm}`)
})