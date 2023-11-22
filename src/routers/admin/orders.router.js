const orderRouter = require('express').Router()

const orderController = require('../../controllers/admin/order.controller')

orderRouter.get('/', orderController.getAllOrders)
orderRouter.get('/:id', orderController.getDetailOrder)
orderRouter.post('/', orderController.createOrder)
orderRouter.patch('/:id', orderController.updateOrder)
orderRouter.delete('/:id', orderController.deleteOrder)

module.exports = orderRouter