const categoriesRouter = require('express').Router()

const categoriesController = require('../controllers/categories.controller')                // import module user.controller yg berbentuk object yg berisi logika program

categoriesRouter.get('/', categoriesController.getAllCategories)                                 // client mengirim permintaan pengambilan data, lalu server menjalankan logika program
categoriesRouter.get('/:id', categoriesController.getDetailCategory)                         // client mengirim permintaan pengambilan data, ~
categoriesRouter.post('/', categoriesController.createCategory)                                 // client mengirim permintaan memasukan data, ~
categoriesRouter.patch('/:id', categoriesController.updateCategory)                             // client mengirim permintaan merubah data, ~
categoriesRouter.delete('/:id', categoriesController.deleteCategory)                            // client mengirim permintaan menghapus data, ~

module.exports = categoriesRouter