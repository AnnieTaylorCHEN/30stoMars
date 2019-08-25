const express = require('express')
const router = express.Router()

const auth = require('../../middleware/auth')

const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../models/User')

//route: GET echelon/auth
//note: get authorized user info
//access: public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error ')
    }
})

//route: POST echelon/auth
//note: authenticate user and get token 
//access: public

router.post('/', [
    check('email', 'Please use valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    //errors from validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const { email, password } = req.body
    try {
        //find the user by email, see if the password matches
        let user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
        }
        //get matched user id, return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600}, (error,token) => {
            if (error) throw error
            res.json({token})
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }

})

module.exports = router