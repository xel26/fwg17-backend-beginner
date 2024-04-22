const adminRouter = require('express').Router()

adminRouter.use('/users', require('./users.router'))
adminRouter.use('/products', require('./products.router'))
adminRouter.use('/orders', require('./orders.router'))
adminRouter.use('/categories', require('./categories.router'))
adminRouter.use('/messages', require('./message.router'))
adminRouter.use('/order-details', require('./orderDetails.router'))
adminRouter.use('/product-categories', require('./productCategories.router'))
adminRouter.use('/product-ratings', require('./productRatings.router'))
adminRouter.use('/size', require('./sizes.router'))
adminRouter.use('/variant', require('./variant.router'))
adminRouter.use('/promo', require('./promo.router'))
adminRouter.use('/tags', require('./tags.router'))
adminRouter.use('/testimonial', require('./testimonial.router'))

module.exports = adminRouter
