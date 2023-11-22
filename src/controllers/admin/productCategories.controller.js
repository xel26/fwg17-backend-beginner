const pcModel = require('../../models/ProductCategories.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllProductCategories = async (req, res) => {
    const {sortBy, order, page} = req.query      
    try {
        const listPC = await pcModel.findAll(sortBy, order, page)
        if(!listPC.length){
            return res.status(404).json({
                success: false,
                message: `no data found`
            })
        }
        return res.json({                                                              
            success: true,
            message: `List all productCategories`,
            result: listPC                                                    
        })
    } catch (error) {
        errorHandler(error, res)
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
        errorHandler(error, res)
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
        errorHandler(error, res)
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
        errorHandler(error, res)
    }
}