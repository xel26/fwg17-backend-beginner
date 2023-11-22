const ptModel = require('../../models/productTags.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllProductTags = async (req, res) => {       
    const {sortBy, order, page} = req.query      
    try {
        const listProductTags = await ptModel.findAll(sortBy, order, page)
        if(!listProductTags.length){
            return res.status(404).json({
                success: false,
                message: `no data found`
            })
        }
        return res.json({                                                              
            success: true,
            message: `List all productTags`,
            results: listProductTags                                                    
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getDetailProductTags = async (req, res) => {                                        
    try {
        const productTag = await ptModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            message: 'detail product tags',
            result: productTag                                                  
        })
    } catch (error) {
        errorHandler(error, res)
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
        if(productTag === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                message: productTag                                                 
            })
        }
        return res.json({                                                              
            success: true,
            messages: 'update product tag successfully',
            results: productTag                                                   
        })
    } catch (error) {
        errorHandler(error, res)
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
        errorHandler(error, res)
    }
}