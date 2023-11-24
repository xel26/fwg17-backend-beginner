const variantModel = require('../../models/variant.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllVariant = async (req, res) => {       
    const {searchKey, sortBy, order, page} = req.query      
    try {
        const listVariants = await variantModel.findAll(searchKey, sortBy, order, page)
        return res.json({                                                              
            success: true,
            message: `List all variants`,
            results: listVariants                                                    
        })
    } catch (error) {
        errorHandler(error, res)
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
        errorHandler(error, res)
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
        if(variant === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                message: variant                                                 
            })
        }
        return res.json({                                                              
            success: true,
            message: 'update variant successfully',
            result: variant                                                   
        })
    } catch (error) {
        errorHandler(error, res)
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
        errorHandler(error, res)
    }
}