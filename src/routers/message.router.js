const messageRouter = require('express').Router()

const messageController = require('../controllers/message.controller')

messageRouter.get('/', messageController.getAllMessages)
messageRouter.get('/detail', messageController.getDetailMessage)
messageRouter.post('/', messageController.createMessage)
messageRouter.patch('/:id', messageController.updateMessage)
messageRouter.delete('/:id', messageController.deleteMessage)      

module.exports = messageRouter                                                     