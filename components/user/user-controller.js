const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const User = require('./user-model')

const createJWT = (id) => {
    const jwtSecret = process.env.JWT_SECRET
    const expireTime = process.env.JWT_EXPIRATION_TIME
    
    const payload = { userID: id }

    return jwt.sign(payload, jwtSecret, { expiresIn: expireTime })
}

module.exports = {
    // Function to add new user to database
    async create(req, res) {
        try {
            // Get request body 
            const { email, password } = req.body

            // Check for existing user
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.status(422).json({
                    message: "Email already exist!"
                })
            }

            // Create new user
            const newUser = new User({email, password})
            await newUser.save()

            // Send back OK response
            res.status(200).json({
                message: "User created successfully!",
                token: createJWT(newUser._id)
            })
        }
        catch (err) {
            res.status(500).json({
                message: `Error creating user: ${err}`
            })
        }
    },

    // Function to check existing user in database
    async findAndCheck(req, res) {
        try {
            // Get request body
            const { email, password} = req.body

            // Check for existing user
            const existingUser = await User.findOne({ email })
            if (!existingUser) {
                return res.status(401).json({
                    message: "User does not exist!"
                })
            }
            
            // Check user password
            const isPasswordMatch = await bcryptjs.compare(password, existingUser.password)
            if (!isPasswordMatch) {
                return res.status(401).json({
                    message: "User unauthorized!"
                })
            }

            // Send back OK response
            res.status(200).json({
                message: "User authorized!",
                token: createJWT(existingUser._id)
            })
        }
        catch (err) {
            res.status(500).json({
                message: `Error checking user: ${err}`
            })
        }
    }
}