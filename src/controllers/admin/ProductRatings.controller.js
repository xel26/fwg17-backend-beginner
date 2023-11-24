const prModel = require('../../models/productRatings.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllProductRatings = async (req, res) => {       
    const {sortBy, order, page} = req.query      
    try {
        const listProductRatings = await prModel.findAll(sortBy, order, page)
        return res.json({                                                              
            success: true,
            message: `List all productRatings`,
            results: listProductRatings                                                    
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getDetailProductRating = async (req, res) => {                                        
    try {
        const productRating = await prModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            message: 'detail productRating',
            result: productRating                                                 
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createProductRating = async (req, res) => {
    try {
        const productRating = await prModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create productRating successfully',
            result: productRating                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.updateProductRating = async (req, res) => {
    try {
        const productRating = await prModel.update(parseInt(req.params.id), req.body)
        if(productRating === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                message: productRating                                         
            })
        }
        return res.json({                                                              
            success: true,
            message: 'update productRating successfully',
            result: productRating                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteProductRating = async (req, res) => {
    try {
        const productRating = await prModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            message: 'delete productRating successfully',
            result: productRating                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}