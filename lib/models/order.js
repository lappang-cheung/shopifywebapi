const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    address: {
        type: String
    },
    description: {
        type: String
    },
    payment: {
        type: String
    },
    date: {
        type: String
    }
})

module.exports = mongoose.model('Order', orderSchema)