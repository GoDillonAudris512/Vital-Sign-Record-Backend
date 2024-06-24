const router = require('express').Router()

// Function to say hello when backend is opened
const sayHello = (req, res) => {
    res.send("Welcome to Vital Sign Record Web Service!")
}

router.get('/', sayHello)

module.exports = router