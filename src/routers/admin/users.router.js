const userRouter = require('express').Router()

const userController = require('../../controllers/admin/user.controller')                // import module user.controller yg berbentuk object yg berisi logika program

userRouter.get('/', userController.getAllUsers)                                 // client mengirim permintaan pengambilan data, lalu server menjalankan logika program
userRouter.get('/:id', userController.getDetailUser)                            // client mengirim permintaan pengambilan data, ~
userRouter.post('/', userController.createUser)                                 // client mengirim permintaan memasukan data, ~
userRouter.patch('/:id', userController.updateUser)                             // client mengirim permintaan merubah data, ~
userRouter.delete('/:id', userController.deleteUser)                            // client mengirim permintaan menghapus data, ~

module.exports = userRouter                                                     