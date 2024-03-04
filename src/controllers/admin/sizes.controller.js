const sizesModel = require('../../models/sizes.model')
const { errorHandler, isStringExist, updateColumn } = require('../../moduls/handling')


exports.getAllSize = async (req, res) => {       
    try {
        const {searchKey, sortBy, order, page=1, limit} = req.query
        const limitData = parseInt(limit) || 5

        const count = await sizesModel.countAll(searchKey)  
        const listSizes = await sizesModel.findAll(searchKey, sortBy, order, page, limitData)
        
        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({                                                              
            success: true,
            message: `List all sizes`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage >= 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listSizes                                                    
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.getDetailSize = async (req, res) => {                                        
    try {
        const size = await sizesModel.findOne(req.params.id)
        return res.json({                                                              
            success: true,
            message: 'detail size',
            results: size                                                  
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.createSize = async (req, res) => {
    try {
        await isStringExist("sizes", "size", req.body.size)
        const size = await sizesModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create size successfully',
            results: size                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.updateSize = async (req, res) => {
    try {
        await sizesModel.findOne(req.params.id)
        await isStringExist("sizes", "size", req.body.size)
        const size = await updateColumn(req.params.id, req.body, "sizes")
        return res.json({                                                              
            success: true,
            message: 'update size successfully',
            results: size                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.deleteSize = async (req, res) => {
    try {
        const size = await sizesModel.delete(req.params.id) 
        return res.json({                                                              
            success: true,
            message: 'delete size successfully',
            results: size                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}