const router = require('express').Router()
const userController = require('./user-controller')

router.post('/user/register', userController.create)

module.exports = router