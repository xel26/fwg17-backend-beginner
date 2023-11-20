const productModel = require('../models/product.model')
const {listAllData, errorHandler} = require('../moduls/handling')


exports.getAllProducts = async (req, res) => {   
    return results = await listAllData(productModel, "products", res)
}


exports.getDetailProduct = async (req, res) => {                                         
    try {
        const listProducts = await productModel.findOne(req.body)
        return res.json({                                                              
            success: true,
            messages: 'detail product',
            results: listProducts                                                  
        })

    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createProduct = async (req, res) => {
    try {
        const listProducts = await productModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create product successfully',
            results: listProducts                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, `The product's name already exists`)
    }
}


exports.updateProduct = async (req, res) => {
    try {
        const listProducts = await productModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update product successfully',
            results: listProducts                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const listProducts = await productModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete product successfully',
            results: listProducts                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}