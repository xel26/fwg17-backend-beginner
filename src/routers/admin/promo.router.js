const promoRouter = require('express').Router()

const promoController = require('../../controllers/admin/promo.controller')

promoRouter.get('/', promoController.getAllPromo)
promoRouter.get('/:id', promoController.getDetailPromo)
promoRouter.post('/', promoController.createPromo)
promoRouter.patch('/:id', promoController.updatePromo)
promoRouter.delete('/:id', promoController.deletePromo)

module.exports = promoRouter
