const psRouter = require('express').Router()

const psController = require('../../controllers/admin/sizes.controller')

psRouter.get('/', psController.getAllSize)
psRouter.get('/:id', psController.getDetailSize)
psRouter.post('/', psController.createSize)
psRouter.patch('/:id', psController.updateSize)
psRouter.delete('/:id', psController.deleteSize)

module.exports = psRouter
