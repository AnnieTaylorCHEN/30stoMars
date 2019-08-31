const express = require('express')
const router = express.Router()
const config = require('config')

const Product = require('../models/Product')

const stripeSecretKey = config.get('STRIPE_SECRET_KEY')
const stripePublicKey = config.get('STRIPE_PUBLIC_KEY')
const stripe = require('stripe')(stripeSecretKey)

//route: GET /shop
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

// router.post('/purchase', async (req, res) => {
//     let items
//     try {
//         items = await Product.find()
//     } catch (error) {
//         items = []
//         console.error(error.message)
//         res.status(500).send('Server error')
//     }
//     let total = 0
//     req.body.items.forEach((item) => {
//             const itemFromDatabase = items.find((i) => i.id == item.id)
//             total = total + Math.round(itemFromDatabase.price * 100) * item.quantity   
//         })
        
//         stripe.charges.create({
//             amount: total,
//             source: req.body.stripeTokenId,
//             currency: 'usd'
//         }).then(() => {
//             console.log('charge successful')
//             res.json({message:'Thank you for your purchase!'})
//         }).catch((error)=> {
//             console.log('charge fail' + error)
//             res.status(500).end()
//         })
// })


module.exports = router