const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lineItemSchema = new Schema({
    quantity:{
        type: Number
    },
    price:{
        type: Number
    },
    delivery:{
        type: String
    }
})

module.exports = mongoose.model('Store', lineItemSchema)