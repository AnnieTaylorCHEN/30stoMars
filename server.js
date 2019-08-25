const path = require('path')
const express = require('express')
const connectDB = require('./config/db')

const app = express()

//connect to the database 
connectDB()

//middleware
app.use(express.json({ extended: false }))

//routes
app.use('/echelon/auth', require('./routes/echelon/auth'))
app.use('/echelon/users', require('./routes/echelon/users'))
app.use('/echelon/profile', require('./routes/echelon/profile'))
app.use('/echelon/posts', require('./routes/echelon/posts'))

//port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('the server is on ' + PORT ))