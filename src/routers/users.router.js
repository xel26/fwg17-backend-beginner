const userRouter = require('express').Router()

const userController = require('../controllers/user.controller')

userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getParameterUrl)
userRouter.post('/insert', userController.insertData)
userRouter.patch('/update', userController.updateData)
userRouter.put('/replace', userController.replaceData)
userRouter.delete('/delete', userController.deleteData)

module.exports = userRouter