const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const Schema = mongoose.Schema

// User consist of email and password
const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Before saving new user or if existing user password is modified, hash using bcrypt
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10
        this.password = await bcryptjs.hash(this.password, saltRounds)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User