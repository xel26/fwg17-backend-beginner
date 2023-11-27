const categoriesModel = require('../../models/categories.model')
const { errorHandler } = require('../../moduls/handling')


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
            messages: `List all categories`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage > 1 ? prevPage : null,
                totalData: parseInt(count)
            },
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
            result: category                                                  
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
            result: category                                                   
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.updateCategory = async (req, res) => {
    try {
        const category = await categoriesModel.update(parseInt(req.params.id), req.body)
        if(category === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                messages: category                                                 
            })
        }
        return res.json({                                                              
            success: true,
            messages: 'update category successfully',
            result: category                                                   
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
            result: category                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}