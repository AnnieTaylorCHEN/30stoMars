const express = require('express')
const router = express.Router()
const config = require('config')

const Product = require('../models/Product')

const stripeSecretKey = config.get('STRIPE_SECRET_KEY')

const stripe = require('stripe')(stripeSecretKey)

//route: GET /store
//note: get all the products on shop page
//access: public

router.get('/', async (req, res) => {
    try {
        let items
        
        //sort by category
        if(!req.query.category) {
            items = await Product.find()
        } else {
            items = await Product.find({category: req.query.category})
        }
        //sort by price and letter
        if(req.query.sortBy) {
            let sort ={}
            const sortByArray = req.query.sortBy.split(':')
            sort[sortByArray[0]] =[sortByArray[1]]
            items = await Product.find().sort(sort).exec()
        }

        res.json(items)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

//route: POST /store/checkout
//note: pay via stripe
//access: public

router.post('/checkout', async (req, res) => {
    console.log('request:', req.body, ' END of request')

    let status
    let error
    let items
    let total = 0
    try {
        items = await Product.find()
        req.body.cart.forEach((cartItem) => {
        const itemFromDatabase = items.find((item) => item._id == cartItem._id)
        total = total + (itemFromDatabase.price * 1000 / 10) * cartItem.count
        console.log(total)
    })
    } catch (error) {
        console.log(error)
    }
    
    try {     
        const { token } = req.body
        
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        await stripe.charges.create({
              amount: total,
              currency: 'usd',
              customer: customer.id,
              receipt_email: token.email,
              shipping: {
                name: token.card.name,
                address: {
                  line1: token.card.address_line1,
                  line2: token.card.address_line2,
                  city: token.card.address_city,
                  country: token.card.address_country,
                  postal_code: token.card.address_zip
                }
              }
            })

        console.log('Charge success:', 'customer is: ' + customer.email)
        status = 'success'

    } catch (error) {
        console.error('Charge fail: ' + error.message)
        status = 'fail'
        res.status(500).send('Server error')
    }

    res.json({ error, status })
})


module.exports = router