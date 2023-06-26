const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rentAvailability: {
        type: Boolean,
        default: false
    },
    rentPrice: {
        type: Number
    },
    desc: {
        type: String,
        required: true
    },
    images: {
        type: Array
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String
    }
}, { timestamps: true })


module.exports = mongoose.model('Product', productSchema)