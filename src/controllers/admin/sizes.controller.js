const psModel = require('../../models/sizes.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllProductSize = async (req, res) => {       
    const {searchKey, sortBy, order, page} = req.query      
    try {
        const listSizes = await psModel.findAll(searchKey, sortBy, order, page)
        if(!listSizes.length){
            return res.status(404).json({
                success: false,
                message: `no data found`
            })
        }
        return res.json({                                                              
            success: true,
            message: `List all sizes`,
            results: listSizes                                                    
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getDetailProductSize = async (req, res) => {                                        
    try {
        const size = await psModel.findOne(parseInt(req.params.id))
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
        const size = await psModel.insert(req.body) 
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
        const size = await psModel.update(parseInt(req.params.id), req.body) 
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
        const size = await psModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete size successfully',
            results: size                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}