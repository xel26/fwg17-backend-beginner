const prModel = require('../../models/productRatings.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllProductRatings = async (req, res) => {       
    try {
        const {sortBy, order, page=1, limit} = req.query
        const limitData = parseInt(limit) || 5

        const count = await prModel.countAll()     
        const listProductRatings = await prModel.findAll(sortBy, order, page, limitData)
        
        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({                                                              
            success: true,
            message: `List all productRatings`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage >= 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listProductRatings                                                    
        })
    } catch (error) {
        return errorHandler(error, res)
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
        return errorHandler(error, res)
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
        return errorHandler(error, res)
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
        return errorHandler(error, res)
    }
}