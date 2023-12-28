const router = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleCheckMiddleware = require('../middleware/roleCheck.middleware')
const productController = require('../controllers/admin/product.controller')
const orderFlow = require('../controllers/orderFlow.controller')
const userController = require('../controllers/admin/user.controller')
const testiController = require('../controllers/admin/testimonial.controller')

const uploadMiddleware = require('../middleware/upload.middleware')
const multerErrorHandler = require('../middleware/multerErrorHandler.middleware')

router.use('/auth', require('./auth.router'))
router.use('/admin', authMiddleware, roleCheckMiddleware("admin"), require('./admin'))                            // setiap ada permintaan ke path /admin authMiddleware dan roleCheckMiddleware akan selalu dijalankan untuk pengecekan otorisasi

router.get('/users/:id', userController.getDetailUser) 
router.patch('/users/:id', uploadMiddleware('users').single('picture'), multerErrorHandler, userController.updateUser)

router.get('/products', productController.getAllProducts)
router.get('/products/:id', productController.getDetailProduct) 
router.post('/orders', authMiddleware, roleCheckMiddleware("customer"), orderFlow.orderProducts)

router.get('/testimonial', testiController.getAllTesti )
router.patch('/testimonial/:id', uploadMiddleware('testimonial').single('image'), multerErrorHandler, testiController.updateTesti)

module.exports = router