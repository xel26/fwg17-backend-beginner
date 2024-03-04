const tagsModel = require('../../models/tags.model')
const { errorHandler } = require('../../moduls/handling')
const { isStringExist, updateColumn } = require('../../moduls/handling')


exports.getAllTags = async (req, res) => {
    try {
        const {searchKey, sortBy, order, page=1, limit} = req.query
        const limitData = parseInt(limit) || 5

        const count = await tagsModel.countAll(searchKey)      
        const listTags = await tagsModel.findAll(searchKey, sortBy, order, page, limitData)
        
        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({                                                              
            success: true,
            message: `List all tags`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage >= 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listTags                                                    
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.getDetailTag = async (req, res) => {
    try {
        const tag = await tagsModel.findOne(req.params.id)
        return res.json({                                                              
            success: true,
            message: 'detail tag',
            results: tag                                                  
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.createTag = async (req, res) => {
    try {
        await isStringExist("tags", "name", req.body.name)
        const tag = await tagsModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create tag successfully',
            results: tag                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.updateTag = async (req, res) => {
    try {
        await tagsModel.findOne(req.params.id)
        await isStringExist("tags", "name", req.body.name)
        const tag = await updateColumn(req.params.id, req.body, "tags") 
        return res.json({                                                              
            success: true,
            message: 'update tag successfully',
            results: tag                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.deleteTag = async (req, res) => {
    try {
        const tag = await tagsModel.delete(req.params.id) 
        return res.json({                                                              
            success: true,
            message: 'delete tag successfully',
            results: tag                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}