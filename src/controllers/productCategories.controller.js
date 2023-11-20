const pcModel = require('../models/ProductCategories.model')
const { errorHandler, listAllData } = require('../moduls/handling')


exports.getAllProductCategories = async (req, res) => {       
    return results = await listAllData(pcModel, "product_categories", res)
}


exports.getDetailProductCategories = async (req, res) => {                                        
    try {
        const listPC = await pcModel.findOne(req.body)
        return res.json({                                                              
            success: true,
            messages: 'detail product categories',
            results: listPC                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createProductCategories = async (req, res) => {
    try {
        const listPC = await pcModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create product categories successfully',
            results: listPC                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, '')
    }
}


exports.updateProductCategories = async (req, res) => {
    try {
        const listPC = await pcModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update product categories successfully',
            results: listPC                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteProductCategories = async (req, res) => {
    try {
        const listPC = await pcModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete product categories successfully',
            results: listPC                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}