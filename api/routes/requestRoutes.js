const router = require('express').Router()
const Request = require('../models/requestModel')

// CREATE A REQUEST
router.post('/', async (req, res) => {
    const newRequest = new Request(req.body)

    try {
        const savedRequest = await newRequest.save()
        res.status(201).json(savedRequest)
    } catch (err) {
        res.json(err)
    }
})

// GET ALL REQUESTS
router.get('/', async (req, res) => {
    try {
        const requests = await Request.find().populate({
            path: 'author',
            select: 'fullName'
        }).populate('reponses').sort({ createdAt: -1 })
        res.json(requests)
    } catch (err) {
        res.json(err)
    }
})

// CREATE A RESPONSE
router.post('/:id/responses', async (req, res) => {
    try {
        const request = await Request.findById(req.params.id)
        const response = req.body

        request.reponses.push(response)
        const updatedRequest = await request.save()

        const populatedRequest = await updatedRequest.populate({
            path: 'reponses',
            populate: {
                path: 'author',
                select: 'fullName'
            }
        })

        const { reponses, _id } = populatedRequest
        res.status(201).json({ reponses, _id })
    } catch (err) {
        res.json(err)
    }
})

module.exports = router