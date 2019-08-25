const express = require('express')
const router = express.Router()
const config = require('config')

const Product = require('../models/Product')

//route: GET /store
//note: get all the products on store page
//access: public

router.get('/store', async (req, res) => {

})