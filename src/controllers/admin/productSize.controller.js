const psModel = require('../../models/productSize.model')
const { errorHandler, listAllData } = require('../../moduls/handling')


exports.getAllProductSize = async (req, res) => {       
    return results = await listAllData(psModel, "product_size", res)
}


exports.getDetailProductSize = async (req, res) => {                                        
    try {
        const listPS = await psModel.findOne(req.body)
        return res.json({                                                              
            success: true,
            messages: 'detail product size',
            results: listPS                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createProductSize = async (req, res) => {
    try {
        const listPS = await psModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create product size successfully',
            results: listPS                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, `the size name already exist`)
    }
}


exports.updateProductSize = async (req, res) => {
    try {
        const listPS = await psModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update product size successfully',
            results: listPS                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteProductSize = async (req, res) => {
    try {
        const listPS = await psModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete product size successfully',
            results: listPS                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}