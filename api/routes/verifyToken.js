const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token

    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) return res.status(403).json('Token is not valid')
            req.user = user
            next()
        })
    } else {
        return res.status(401).json("You don't have access to proceed further")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user._id === req.params._id || req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json("You don't have acces to proceed further")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.body.isAdmin) {
            next()
        } else {
            return res.status(403).json("You don't have access to proceed further")
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }