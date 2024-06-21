const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

module.exports = {
    authMiddleware(req, res, next) {
        const authHeader = req.headers.authorization

        // Check for authorization header
        if (!authHeader || (authHeader && !authHeader.startsWith("Bearer "))) {
            return res.status(401).json({
                message: "Invalid or missing Authorization Header!"
            })
        } 

        // Get JWT token
        const token = authHeader.split(' ')[1]
        try {
            const decoded = jwt.verify(token, jwtSecret)
            req.body.email = decoded.email
            next()
        }
        catch (err) {
            return res.status(403).json({
                message: "Invalid JWT token!"
            })
        }
    }
}