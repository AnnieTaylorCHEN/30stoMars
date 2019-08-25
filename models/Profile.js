const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'user'
    },
    location: {
        type: String
    },
    favmarsalbum: {
        type: String
    },
    favmarssong: {
        type: String
    }, 
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)