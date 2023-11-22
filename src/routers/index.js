const router = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleCheckMiddleware = require('../middleware/roleCheck.middleware')

router.use('/auth', require('./auth.router'))                   // membuat root/base endpoint , dan mengimpor module auth.router yg berisi subendpoint/subresource
router.use('/admin', authMiddleware, require('./admin'))

module.exports = router                                         // mengeksport router agar bisa di import di tempat lain