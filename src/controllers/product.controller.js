const productModel = require('../models/product.model')
const {errorHandler} = require('../moduls/handling')


exports.getAllProducts = async (req, res) => {   
    const {searchKey, sortBy, order, page} = req.query
    try {
        const listProducts = await productModel.findAll(searchKey, sortBy, order, page)
        return res.json({
            success: true,
            message: 'List all products',
            results: listProducts
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getDetailProduct = async (req, res) => {                                         
    try {
        const listProducts = await productModel.findOne(req.params.id)
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