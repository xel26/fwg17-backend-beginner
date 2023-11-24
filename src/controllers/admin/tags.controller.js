const tagsModel = require('../../models/tags.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllTags = async (req, res) => {       
    const {searchKey, sortBy, order, page} = req.query      
    try {
        const listTags = await tagsModel.findAll(searchKey, sortBy, order, page)
        return res.json({                                                              
            success: true,
            message: `List all tags`,
            results: listTags                                                    
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getDetailTag = async (req, res) => {                                        
    try {
        const tag = await tagsModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            message: 'detail tag',
            result: tag                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createTag = async (req, res) => {
    try {
        const tag = await tagsModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create tag successfully',
            result: tag                                                   
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.updateTag = async (req, res) => {
    try {
        const tag = await tagsModel.update(parseInt(req.params.id), req.body) 
        if(tag === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                message: tag                                                 
            })
        }
        return res.json({                                                              
            success: true,
            message: 'update tag successfully',
            result: tag                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteTag = async (req, res) => {
    try {
        const tag = await tagsModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            message: 'delete tag successfully',
            result: tag                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}