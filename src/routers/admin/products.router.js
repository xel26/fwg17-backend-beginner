const productRouter = require('express').Router()

const productController = require('../../controllers/admin/product.controller')

const upploadMiddleware = require('../../middleware/upload.middleware')

productRouter.get('/', productController.getAllProducts)                       
productRouter.get('/:id', productController.getDetailProduct)                 
productRouter.post('/', productController.createProduct)                      
productRouter.patch('/:id',upploadMiddleware('products').single('image'), productController.updateProduct)                      // 'products' = nama folder untuk menyimpan gambar, 'image' = nama column            
productRouter.delete('/:id', productController.deleteProduct)                       

module.exports = productRouter                                                     