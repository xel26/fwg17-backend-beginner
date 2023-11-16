const router = require('express').Router()

router.use('/auth', require('./auth.router'))
router.use('/users', require('./users.router'))

module.exports = router