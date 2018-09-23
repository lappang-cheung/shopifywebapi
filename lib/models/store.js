const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    country: {
        type: String
    }
})

module.exports = mongoose.model('Store', storeSchema)