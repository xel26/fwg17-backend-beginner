const ptModel = require('../../models/productTags.model')
const { errorHandler, listAllData } = require('../../moduls/handling')


exports.getAllProductTags = async (req, res) => {       
    return results = await listAllData(ptModel, "product_tags", res)
}


exports.getDetailProductTags = async (req, res) => {                                        
    try {
        const listPT = await ptModel.findOne(req.body)
        return res.json({                                                              
            success: true,
            messages: 'detail product tags',
            results: listPT                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createProductTags = async (req, res) => {
    try {
        const listPT = await ptModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create product tags successfully',
            results: listPT                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, '')
    }
}


exports.updateProductTags = async (req, res) => {
    try {
        const listPT = await ptModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update product tags successfully',
            results: listPT                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteProductTags = async (req, res) => {
    try {
        const listPT = await ptModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete product tags successfully',
            results: listPT                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}