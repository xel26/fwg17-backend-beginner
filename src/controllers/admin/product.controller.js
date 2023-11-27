const productModel = require('../../models/product.model')
const {errorHandler} = require('../../moduls/handling')


exports.getAllProducts = async (req, res) => {   
    try {
        const {searchKey, sortBy, order, page=1, limit} = req.query
        const limitData = parseInt(limit) || 5

        const count = await productModel.countAll(searchKey)
        const listProducts = await productModel.findAll(searchKey, sortBy, order, page, limitData)

        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({
            success: true,
            message: 'List all products',
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage > 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listProducts
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getDetailProduct = async (req, res) => {                                         
    try {
        const product = await productModel.findOne(req.params.id)
        return res.json({                                                              
            success: true,
            message: 'detail product',
            result: product                                                  
        })

    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createProduct = async (req, res) => {
    try {
        if(req.file){
            console.log(req.file)
            req.body.image = req.file.filename
        }
    

        const product = await productModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create product successfully',
            result: product                                                   
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}



exports.updateProduct = async (req, res) => {
    try {
        if(req.file){
            console.log(req.file)
            req.body.image = req.file.filename
        }
    
        const product = await productModel.update(parseInt(req.params.id), req.body)
        if(product === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                message: product                                                 
            })
        }
        return res.json({                                                              
            success: true,
            message: 'update product successfully',
            result: product                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const product = await productModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            message: 'delete product successfully',
            result: product                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}