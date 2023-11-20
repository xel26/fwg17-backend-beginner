const categoriesModel = require('../models/categories.model')
const { errorHandler, listAllData } = require('../moduls/handling')


exports.getAllCategories = async (req, res) => {       
    return results = await listAllData(categoriesModel, "categories", res)
}


exports.getDetailCategory = async (req, res) => {                                        
    try {
        const listCategory = await categoriesModel.findOne(req.body)
        return res.json({                                                              
            success: true,
            messages: 'detail category',
            results: listCategory                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createCategory = async (req, res) => {
    try {
        const listCategory = await categoriesModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create category successfully',
            results: listCategory                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, `the category's name already exist`)
    }
}


exports.updateCategory = async (req, res) => {
    try {
        const listCategory = await categoriesModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update category successfully',
            results: listCategory                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteCategory = async (req, res) => {
    try {
        const listCategory = await categoriesModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete category successfully',
            results: listCategory                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}