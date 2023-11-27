const sizesModel = require('../../models/sizes.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllProductSize = async (req, res) => {       
    try {
        const {sortBy, order, page=1, limit} = req.query
        const limitData = parseInt(limit) || 5

        const count = await sizesModel.countAll()  
        const listSizes = await sizesModel.findAll(sortBy, order, page, limitData)
        
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
                prevPage: prevPage > 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listSizes                                                    
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getDetailProductSize = async (req, res) => {                                        
    try {
        const size = await sizesModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            message: 'detail size',
            result: size                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createProductSize = async (req, res) => {
    try {
        const size = await sizesModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create size successfully',
            results: size                                                   
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.updateProductSize = async (req, res) => {
    try {
        const size = await sizesModel.update(parseInt(req.params.id), req.body)
        if(size === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                message: size                                                 
            })
        }
        return res.json({                                                              
            success: true,
            messages: 'update size successfully',
            results: size                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteProductSize = async (req, res) => {
    try {
        const size = await sizesModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete size successfully',
            results: size                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}