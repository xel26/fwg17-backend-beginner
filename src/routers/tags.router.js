const tagsRouter = require('express').Router()

const tagsController = require('../controllers/tags.controller') 

tagsRouter.get('/', tagsController.getAllTags)                   
tagsRouter.get('/detail', tagsController.getDetailTag)          
tagsRouter.post('/', tagsController.createTag)                  
tagsRouter.patch('/:id', tagsController.updateTag)              
tagsRouter.delete('/:id', tagsController.deleteTag)             

module.exports = tagsRouter                                                     