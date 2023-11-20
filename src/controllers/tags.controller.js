const tagsModel = require('../models/tags.model')
const { errorHandler, listAllData } = require('../moduls/handling')


exports.getAllTags = async (req, res) => {       
    return results = await listAllData(tagsModel, "tags", res)
}


exports.getDetailTag = async (req, res) => {                                        
    try {
        const listTags = await tagsModel.findOne(req.body)
        return res.json({                                                              
            success: true,
            messages: 'detail tag',
            results: listTags                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createTag = async (req, res) => {
    try {
        const listTags = await tagsModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create tag successfully',
            results: listTags                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, `the tag's name already exist`)
    }
}


exports.updateTag = async (req, res) => {
    try {
        const listTags = await tagsModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update tag successfully',
            results: listTags                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteTag = async (req, res) => {
    try {
        const listTags = await tagsModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete tag successfully',
            results: listTags                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}