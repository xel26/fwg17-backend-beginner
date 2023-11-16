const router = require('express').Router()                      // import module express

router.use('/auth', require('./auth.router'))                   // membuat root/base endpoint , dan mengimpor module auth.router yg berisi subendpoint/subresource
router.use('/users', require('./users.router'))                 // membuat root/base endpoint , dan mengimpor module users.router yg berisi subendpoint/subresource

module.exports = router                                         // mengeksport router agar bisa di import di tempat lain