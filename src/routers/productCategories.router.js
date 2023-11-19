const pcRouter = require('express').Router()

const pcController = require('../controllers/productCategories.controller')                // import module user.controller yg berbentuk object yg berisi logika program

pcRouter.get('/', pcController.getAllProductCategories)                                 // client mengirim permintaan pengambilan data, lalu server menjalankan logika program
pcRouter.get('/detail', pcController.getDetailProductCategories)                         // client mengirim permintaan pengambilan data, ~
pcRouter.post('/', pcController.createProductCategories)                                 // client mengirim permintaan memasukan data, ~
pcRouter.patch('/:id', pcController.updateProductCategories)                             // client mengirim permintaan merubah data, ~
pcRouter.delete('/:id', pcController.deleteProductCategories)                            // client mengirim permintaan menghapus data, ~

module.exports = pcRouter                                                     