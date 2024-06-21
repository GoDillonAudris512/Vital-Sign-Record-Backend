const router = require('express').Router()

const sayHello = (req, res) => {
    res.send("Welcome to Vital Sign Record Web Service!")
}

router.get('/', sayHello)

module.exports = router