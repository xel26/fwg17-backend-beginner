const adminRouter = require('express').Router()                      // import module express

adminRouter.use('/users', require('./users.router'))
adminRouter.use('/products', require('./products.router'))
adminRouter.use('/orders', require('./orders.router'))
adminRouter.use('/categories', require('./categories.router'))
adminRouter.use('/message', require('./message.router'))
adminRouter.use('/order-details', require('./orderDetails.router'))
adminRouter.use('/product-categories', require('./productCategories.router'))
adminRouter.use('/product-ratings', require('./productRatings.router'))
adminRouter.use('/product-size', require('./sizes.router'))
adminRouter.use('/product-tags', require('./productTags.router'))
adminRouter.use('/variant', require('./variant.router'))
adminRouter.use('/promo', require('./promo.router'))
adminRouter.use('/tags', require('./tags.router'))

module.exports = adminRouter                                         // mengeksport router agar bisa di import di tempat lain