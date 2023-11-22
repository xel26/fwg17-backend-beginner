const psRouter = require('express').Router()

const psController = require('../../controllers/admin/sizes.controller') 

psRouter.get('/', psController.getAllProductSize)                        
psRouter.get('/:id', psController.getDetailProductSize)                  
psRouter.post('/', psController.createProductSize)                       
psRouter.patch('/:id', psController.updateProductSize)                   
psRouter.delete('/:id', psController.deleteProductSize)                  

module.exports = psRouter                                                     