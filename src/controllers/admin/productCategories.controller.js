const pcModel = require('../../models/ProductCategories.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllProductCategories = async (req, res) => {
    try {
        const {sortBy, order, page=1, limit} = req.query
        const limitData = parseInt(limit) || 5

        const count = await pcModel.countAll()   
        const listPC = await pcModel.findAll(sortBy, order, page, limitData)
        
        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({                                                              
            success: true,
            message: `List all productCategories`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage >= 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            result: listPC                                                    
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.getDetailProductCategories = async (req, res) => {                                        
    try {
        const ProductCategories = await pcModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            message: 'detail ProductCategories',
            result: ProductCategories                                                  
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.createProductCategories = async (req, res) => {
    try {
        const listPC = await pcModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create productCategory successfully',
            result: listPC                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, '')
    }
}


exports.updateProductCategories = async (req, res) => {
    try {
        const ProductCategories = await pcModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            message: 'update productCategory successfully',
            result: ProductCategories                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.deleteProductCategories = async (req, res) => {
    try {
        const ProductCategories = await pcModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            message: 'delete productCategory successfully',
            result: ProductCategories                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}