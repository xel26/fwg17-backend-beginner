const prModel = require('../models/productRatings.model')
const { errorHandler, errorWithCode, listAllData } = require('../moduls/handling')


exports.getAllProductRatings = async (req, res) => {       
    return results = await listAllData(prModel, "product_ratings", res)
}


exports.getDetailProductRating = async (req, res) => {                                        
    try {
        const listPR = await prModel.findOne(req.body)
        return res.json({                                                              
            success: true,
            messages: 'detail product rating',
            results: listPR                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createProductRating = async (req, res) => {
    try {
        const listPR = await prModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create product ratin successfully',
            results: listPR                                                   
        })
        
    } catch (error) {
        return errorWithCode(error, res, '')
    }
}


exports.updateProductRating = async (req, res) => {
    try {
        const listPR = await prModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update product ratings successfully',
            results: listPR                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteProductRating = async (req, res) => {
    try {
        const listPR = await prModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete product ratings successfully',
            results: listPR                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}