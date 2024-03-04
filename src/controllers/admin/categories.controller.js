const categoriesModel = require('../../models/categories.model')
const { errorHandler } = require('../../moduls/handling')
const {isStringExist, updateColumn } = require('../../moduls/handling')


exports.getAllCategories = async (req, res) => {       
    try {
        const {searchKey, sortBy, order, page=1, limit} = req.query  
        const limitData = parseInt(limit) || 5

        const count = await categoriesModel.countAll(searchKey)
        const listCategories = await categoriesModel.findAll(searchKey, sortBy, order, page, limitData)

        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({                                                              
            success: true,
            message: `List all categories`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage >= 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listCategories                                                    
        })
    } catch (error) {
        return errorHandler(error, res)
    }}


exports.getDetailCategory = async (req, res) => {                                        
    try {
        const category = await categoriesModel.findOne(req.params.id)
        return res.json({                                                              
            success: true,
            message: 'detail category',
            results: category                                                  
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.createCategory = async (req, res) => {
    try {
        await isStringExist("categories", "name", req.body.name)
        const category = await categoriesModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create category successfully',
            results: category                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.updateCategory = async (req, res) => {
    try {
        await categoriesModel.findOne(req.params.id)
        await isStringExist("categories", "name", req.body.name)

        const category = await updateColumn(req.params.id, req.body, "categories")
        return res.json({                                                              
            success: true,
            message: 'update category successfully',
            results: category                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.deleteCategory = async (req, res) => {
    try {
        const category = await categoriesModel.delete(req.params.id) 
        return res.json({                                                              
            success: true,
            message: 'delete category successfully',
            results: category                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}