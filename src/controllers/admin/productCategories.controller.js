const pcModel = require('../../models/ProductCategories.model')
const { errorHandler, updateColumn } = require('../../moduls/handling')


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
            results: listPC                                                    
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.getDetailProductCategories = async (req, res) => {                                        
    try {
        const ProductCategories = await pcModel.findOne(req.params.id)
        return res.json({                                                              
            success: true,
            message: 'detail ProductCategories',
            results: ProductCategories                                                  
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.createProductCategories = async (req, res) => {
    try {
        await pcModel.findData(req.body.productId, req.body.categoryId)
        const listPC = await pcModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create productCategory successfully',
            results: listPC                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.updateProductCategories = async (req, res) => {
    try {
        await pcModel.findOne(req.params.id)
        await pcModel.findData(req.body.productId, req.body.categoryId)
        const ProductCategories = await updateColumn(req.params.id, req.body, "productCategories") 
        return res.json({                                                              
            success: true,
            message: 'update productCategory successfully',
            results: ProductCategories                                                 
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.deleteProductCategories = async (req, res) => {
    try {
        const ProductCategories = await pcModel.delete(req.params.id)
        return res.json({                                                              
            success: true,
            message: 'delete productCategory successfully',
            results: ProductCategories                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}