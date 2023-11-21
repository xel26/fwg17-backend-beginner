const psRouter = require('express').Router()

const psController = require('../controllers/productSize.controller')                // import module user.controller yg berbentuk object yg berisi logika program

psRouter.get('/', psController.getAllProductSize)                                 // client mengirim permintaan pengambilan data, lalu server menjalankan logika program
psRouter.get('/:id', psController.getDetailProductSize)                         // client mengirim permintaan pengambilan data, ~
psRouter.post('/', psController.createProductSize)                                 // client mengirim permintaan memasukan data, ~
psRouter.patch('/:id', psController.updateProductSize)                             // client mengirim permintaan merubah data, ~
psRouter.delete('/:id', psController.deleteProductSize)                            // client mengirim permintaan menghapus data, ~

module.exports = psRouter                                                     