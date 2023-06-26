const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const requestSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    reponses: [responseSchema],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Request', requestSchema)