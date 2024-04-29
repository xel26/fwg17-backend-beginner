const variantRouter = require('express').Router()

const variantController = require('../../controllers/admin/variant.controller')

variantRouter.get('/', variantController.getAllVariant)
variantRouter.get('/:id', variantController.getDetailVariant)
variantRouter.post('/', variantController.createVariant)
variantRouter.patch('/:id', variantController.updateVariant)
variantRouter.delete('/:id', variantController.deleteVariant)

module.exports = variantRouter
