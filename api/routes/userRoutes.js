const router = require('express').Router()
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')

const User = require('../models/userModel')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

// REGISTER
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        fullName: req.body.fullName,
        department: req.body.department,
        phoneNumber: req.body.phoneNumber,
        collegeId: req.body.collegeId,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })

    try {
        const saveduser = await newUser.save()
        const accessToken = jwt.sign({
            id: saveduser._id
        }, process.env.JWT_SEC, { expiresIn: '20d' })

        const { password, ...others } = await savedUser._doc
        res.status(201).json({ ...others, accessToken })
    } catch (err) {
        res.json(err)
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })

        if (!user) {
            return res.status(401).json('Username or password is incorrect')
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        if (OriginalPassword !== req.body.password) {
            return res.status(401).json('Usernamew or password is incorrect')
        }

        const accessToken = jwt.sign({
            id: user._id
        }, process.env.JWT_SEC, { expiresIn: '20d' })

        const { password, ...others } = user._doc

        res.status(200).json({ ...others, accessToken })
    } catch (err) {
        res.json(err)
    }
})

// UPDATE USER
router.put('/:id', async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.json(err)
    }
})

// GET ALL USERS
router.get('/find', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.json(err)
    }
})

// GET A USER
router.get('/find/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        return res.status(403).json(err)
    }
})

// APPROVE USER
router.put('/approve/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            isApproved: !user.isApproved
        }, { new: true })
        const { _id, isApproved } = updatedUser._doc
        res.status(200).json({ _id, isApproved })
    } catch (err) {
        return res.status(403).json(err)
    }
})


// APPROVE SELLING
router.put('/sell/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            isSeller: !user.isSeller
        }, { new: true })
        const { _id, isSeller } = updatedUser._doc
        res.status(200).json({ _id, isSeller })
    } catch (err) {
        return res.status(403).json(err)
    }
})

// DISAPPROVE USER
router.put('/disable/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            isDisabled: !user.isDisabled
        }, { new: true })
        const { _id, isDisabled } = updatedUser._doc
        res.status(200).json({ _id, isDisabled })
    } catch (err) {
        return res.status(403).json(err)
    }
})

// REVIEW USER
router.post('/:id/review', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const review = req.body

        user.reviews.push(review)
        const updatedUser = await user.save()

        const populatedUser = await updatedUser.populate({
            path: 'reviews',
            populate: {
                path: 'author',
                select: 'fullName'
            }
        })

        const { reviews, _id } = populatedUser
        res.status(201).json({ reviews, _id })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router