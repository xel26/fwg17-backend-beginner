const ptModel = require('../../models/productTags.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllProductTags = async (req, res) => {       
    try {
        const {sortBy, order, page=1, limit} = req.query
        const limitData = parseInt(limit) || 5

        const count = await ptModel.countAll()      
        const listProductTags = await ptModel.findAll(sortBy, order, page, limitData)
        
        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({                                                              
            success: true,
            message: `List all productTags`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage >= 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listProductTags                                                    
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.getDetailProductTags = async (req, res) => {                                        
    try {
        const productTag = await ptModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            message: 'detail product tag',
            result: productTag                                                  
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.createProductTags = async (req, res) => {
    try {
        const productTag = await ptModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create product tag successfully',
            result: productTag                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, '')
    }
}


exports.updateProductTags = async (req, res) => {
    try {
        const productTag = await ptModel.update(parseInt(req.params.id), req.body)

        return res.json({                                                              
            success: true,
            messages: 'update product tag successfully',
            results: productTag                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.deleteProductTags = async (req, res) => {
    try {
        const productTag = await ptModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete product tag successfully',
            results: productTag                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}