const express = require('express')
const router = express.Router()

const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../models/User')

//route: POST echelon/users
//note: register a user
//access: public 
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please use valid email').isEmail(),
    check('password', 'Must be 6 or more characters').isLength({min:6})
], async (req, res)=> {
    //errors 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    const { name, email, password } = req.body

    try {
        //see if user exists, if so, return with error msg
        let user = await User.findOne({email})
        if (user) {
            return res.status(400).json({errors: [{ msg: 'User already exists' }]})
        }
        //get user's avatar from email, default to robot icon
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'robohash'
        })
        //create new user using the req info and avatar
        user = new User({
            name, 
            email, 
            password,
            avatar
        })
        //encrypt password and save user to database
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)
        await user.save()
        //get user id after saving, return jsonwebtoken
        const payload = {
            user : {
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