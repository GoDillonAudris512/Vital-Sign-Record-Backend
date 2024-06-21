const router = require('express').Router()
const middleware = require('../../app/middleware')
const recordController = require('./record-controller')

router.post('/record', middleware.authMiddleware, recordController.create)
router.get('/record', middleware.authMiddleware, recordController.findAll)

module.exports = router