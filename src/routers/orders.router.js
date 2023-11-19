const orderRouter = require('express').Router()

const orderController = require('../controllers/order.controller')

orderRouter.get('/', orderController.getAllOrders)
orderRouter.get('/detail', orderController.getDetailOrder)
orderRouter.post('/', orderController.createOrder)
orderRouter.patch('/:id', orderController.updateOrder)
orderRouter.delete('/:id', orderController.deleteOrder)

module.exports = orderRouter