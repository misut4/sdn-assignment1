const mongoose = require('mongoose')

const nationRepository = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Nation', nationRepository)