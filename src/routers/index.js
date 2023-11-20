const router = require('express').Router()                      // import module express

router.use('/auth', require('./auth.router'))                   // membuat root/base endpoint , dan mengimpor module auth.router yg berisi subendpoint/subresource
router.use('/users', require('./users.router'))
router.use('/products', require('./products.router'))
router.use('/orders', require('./orders.router'))
router.use('/categories', require('./categories.router'))
router.use('/message', require('./message.router'))
router.use('/order-details', require('./orderDetails.router'))
router.use('/product-categories', require('./productCategories.router'))
router.use('/product-ratings', require('./productRatings.router'))
router.use('/product-size', require('./productSize.router'))
router.use('/product-tags', require('./productTags.router'))
router.use('/variant', require('./variant.router'))
router.use('/promo', require('./promo.router'))
router.use('/tags', require('./tags.router'))

module.exports = router                                         // mengeksport router agar bisa di import di tempat lain