const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next ) => {
    //get the token from the header
    const token = req.header('x-auth-token')
    //check if there is a token or not
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' })
    }
    //if there is token, verify the token, req.user = id object
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({ msg: 'token is not valid.'})
    }
}

module.exports = auth