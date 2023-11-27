const router = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleCheckMiddleware = require('../middleware/roleCheck.middleware')
const productController = require('../controllers/admin/product.controller')
const orderFlow = require('../controllers/orderFlow.controller')

router.use('/auth', require('./auth.router'))
router.use('/admin', authMiddleware, roleCheckMiddleware("admin"), require('./admin'))                            // setiap ada permintaan ke path /admin authMiddleware dan roleCheckMiddleware akan selalu dijalankan untuk pengecekan otorisasi

router.get('/products', productController.getAllProducts)
router.post('/orders', authMiddleware, roleCheckMiddleware("customer"), orderFlow.orderProducts)

module.exports = router