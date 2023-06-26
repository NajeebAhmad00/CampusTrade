const router = require('express').Router()
const Product = require('../models/productModel')
const { verifyToken } = require('./verifyToken')

// CREATE PRODUCT
router.post('/', async (req, res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    } catch (err) {
        return res.json(err)
    }
})

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
        res.json(products)
    } catch (err) {
        res.json(err)
    }
})

// GET A PRODUCT
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate({
            path: 'seller',
            select: 'fullName reviews email phoneNumber'
        })
        res.json(product)
    } catch (err) {
        res.json(err)
    }
})

module.exports = router