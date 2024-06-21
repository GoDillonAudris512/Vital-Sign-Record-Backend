const router = require('express').Router()
const userController = require('./user-controller')

router.post('/user/register', userController.create)
router.post('/user/login', userController.findAndCheck)

module.exports = router