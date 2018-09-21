const express = require('express')

const app = express()
const PORT = process.env.PORT || 4000

app.get('/healthcheck', async (req, res, next) => {
    const docs = await {message: 'API server online'}
    res.status(200).send(docs)
})

app.listen(PORT, async() => {
    console.log(`Listening on port ${PORT}`)
})