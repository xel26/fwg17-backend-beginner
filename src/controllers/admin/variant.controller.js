const variantModel = require('../../models/variant.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllVariant = async (req, res) => {       
    try {
        const {searchKey, sortBy, order, page=1, limit} = req.query
        const limitData = parseInt(limit) || 5

        const count = await variantModel.countAll(searchKey)   
        const listVariants = await variantModel.findAll(searchKey, sortBy, order, page, limitData)
        
        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({                                                              
            success: true,
            message: `List all variants`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage >= 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listVariants                                                    
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.getDetailVariant = async (req, res) => {                                        
    try {
        const variant = await variantModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            message: 'detail variant',
            result: variant                                                  
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.createVariant = async (req, res) => {
    try {
        const variant = await variantModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create variant successfully',
            result: variant                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.updateVariant = async (req, res) => {
    try {
        const variant = await variantModel.update(parseInt(req.params.id), req.body)

        return res.json({                                                              
            success: true,
            message: 'update variant successfully',
            result: variant                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.deleteVariant = async (req, res) => {
    try {
        const variant = await variantModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            message: 'delete variant successfully',
            result: variant                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}