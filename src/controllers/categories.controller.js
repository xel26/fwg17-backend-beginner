const categoriesModel = require('../models/categories.model')
const { errorHandler } = require('../moduls/handling')


exports.getAllCategories = async (req, res) => {       
    const {searchKey, sortBy, order, page} = req.query      
    try {
        const listCategories = await categoriesModel.findAll(searchKey, sortBy, order, page)
        if(!listCategories.length){
            return res.status(404).json({
                success: false,
                messages: `no data found`
            })
        }
        return res.json({                                                              
            success: true,
            messages: `List all categories`,
            results: listCategories                                                    
        })
    } catch (error) {
        errorHandler(error, res)
    }}


exports.getDetailCategory = async (req, res) => {                                        
    try {
        const category = await categoriesModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            messages: 'detail category',
            results: category                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createCategory = async (req, res) => {
    try {
        const category = await categoriesModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create category successfully',
            results: category                                                   
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.updateCategory = async (req, res) => {
    try {
        const category = await categoriesModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update category successfully',
            results: category                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteCategory = async (req, res) => {
    try {
        const category = await categoriesModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete category successfully',
            results: category                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}