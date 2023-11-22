const ptRouter = require('express').Router()

const ptController = require('../../controllers/admin/productTags.controller')                // import module user.controller yg berbentuk object yg berisi logika program

ptRouter.get('/', ptController.getAllProductTags)                                 // client mengirim permintaan pengambilan data, lalu server menjalankan logika program
ptRouter.get('/:id', ptController.getDetailProductTags)                         // client mengirim permintaan pengambilan data, ~
ptRouter.post('/', ptController.createProductTags)                                 // client mengirim permintaan memasukan data, ~
ptRouter.patch('/:id', ptController.updateProductTags)                             // client mengirim permintaan merubah data, ~
ptRouter.delete('/:id', ptController.deleteProductTags)                            // client mengirim permintaan menghapus data, ~

module.exports = ptRouter                                                     