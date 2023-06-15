const mongoose = require('mongoose')

const nationRepository = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    players: {
        type: mongoose.ObjectId,
        ref: 'Player'
    }
}, {timestamps: true})

module.exports = mongoose.model('Nation', nationRepository)