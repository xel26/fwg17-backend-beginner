const productRouter = require('express').Router()

const productController = require('../controllers/product.controller')                // import module user.controller yg berbentuk object yg berisi logika program

productRouter.get('/', productController.getAllProducts)                                 // client mengirim permintaan pengambilan data, lalu server menjalankan logika program
productRouter.get('/:id', productController.getDetailProduct)                         // client mengirim permintaan pengambilan data, ~
productRouter.post('/', productController.createProduct)                                 // client mengirim permintaan memasukan data, ~
productRouter.patch('/:id', productController.updateProduct)                             // client mengirim permintaan merubah data, ~
productRouter.delete('/:id', productController.deleteProduct)                            // client mengirim permintaan menghapus data, ~

module.exports = productRouter                                                     