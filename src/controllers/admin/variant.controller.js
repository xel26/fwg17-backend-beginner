const variantModel = require('../../models/variant.model')
const { errorHandler, listAllData } = require('../../moduls/handling')


exports.getAllVariant = async (req, res) => {       
    return results = await listAllData(variantModel, "variant", res)
}


exports.getDetailVariant = async (req, res) => {                                        
    try {
        const listVariant = await variantModel.findOne(req.body)
        return res.json({                                                              
            success: true,
            messages: 'detail variant',
            results: listVariant                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createVariant = async (req, res) => {
    try {
        const listVariant = await variantModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create variant successfully',
            results: listVariant                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, `the variant's name already exist`)
    }
}


exports.updateVariant = async (req, res) => {
    try {
        const listVariant = await variantModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update variant successfully',
            results: listVariant                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteVariant = async (req, res) => {
    try {
        const listVariant = await variantModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete variant successfully',
            results: listVariant                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}