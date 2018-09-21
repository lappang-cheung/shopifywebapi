const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')

const app = express()
const PORT = process.env.PORT || 4000

app.get('/healthcheck', async (req, res, next) => {
    const docs = await {message: 'API server online'}
    res.status(200).send(docs)
})

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))

app.listen(PORT, async() => {
    console.log(`Listening on port ${PORT}`)
})