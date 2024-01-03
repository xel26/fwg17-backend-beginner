const router = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleCheckMiddleware = require('../middleware/roleCheck.middleware')
const productController = require('../controllers/admin/product.controller')
const orderFlow = require('../controllers/orderFlow.controller')
const testiController = require('../controllers/admin/testimonial.controller')
const { createOrder, getAllOrders, getDetailOrder } = require('../controllers/admin/order.controller')

const uploadMiddleware = require('../middleware/upload.middleware')
const multerErrorHandler = require('../middleware/multerErrorHandler.middleware')

router.use('/auth', require('./auth.router'))
router.use('/admin', authMiddleware, roleCheckMiddleware("admin"), require('./admin'))                            // setiap ada permintaan ke path /admin authMiddleware dan roleCheckMiddleware akan selalu dijalankan untuk pengecekan otorisasi

router.use('/profile', authMiddleware, require('./profile.router'))

router.get('/products', productController.getAllProducts)
router.get('/products/:id', productController.getDetailProduct) 

router.post('/order', authMiddleware, createOrder)
router.get('/orders', authMiddleware, getAllOrders)
router.get('/order/:id', authMiddleware, getDetailOrder)

router.post('/order-flow', authMiddleware, roleCheckMiddleware("customer"), orderFlow.orderProducts)

router.get('/testimonial', testiController.getAllTesti )
router.patch('/testimonial/:id', uploadMiddleware('testimonial').single('image'), multerErrorHandler, testiController.updateTesti)



module.exports = router