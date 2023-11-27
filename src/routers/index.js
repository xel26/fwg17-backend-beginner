const router = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleCheckMiddleware = require('../middleware/roleCheck.middleware')
const {getAllProducts} = require('../controllers/admin/product.controller')

router.use('/auth', require('./auth.router'))
router.use('/admin', authMiddleware, roleCheckMiddleware("admin"), require('./admin'))                            // setiap ada permintaan ke path /admin authMiddleware dan roleCheckMiddleware akan selalu dijalankan untuk pengecekan otorisasi
router.use('/products', getAllProducts)

module.exports = router