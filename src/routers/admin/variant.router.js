const variantRouter = require('express').Router()

const variantController = require('../../controllers/admin/variant.controller')                   // import module user.controller yg berbentuk object yg berisi logika program

variantRouter.get('/', variantController.getAllVariant)                                  // client mengirim permintaan pengambilan data, lalu server menjalankan logika program
variantRouter.get('/:id', variantController.getDetailVariant)                         // client mengirim permintaan pengambilan data, ~
variantRouter.post('/', variantController.createVariant)                                 // client mengirim permintaan memasukan data, ~
variantRouter.patch('/:id', variantController.updateVariant)                             // client mengirim permintaan merubah data, ~
variantRouter.delete('/:id', variantController.deleteVariant)                            // client mengirim permintaan menghapus data, ~

module.exports = variantRouter                                                     