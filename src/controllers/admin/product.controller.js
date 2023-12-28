const productModel = require('../../models/product.model')
const {errorHandler} = require('../../moduls/handling')
const path = require('path')
const fs = require('fs/promises')


exports.getAllProducts = async (req, res) => {   
    try {
        const {searchKey, sortBy, order, page=1, limit, category} = req.query
        const limitData = parseInt(limit) || 6

        const count = await productModel.countAll(searchKey, category)
        const listProducts = await productModel.findAll(searchKey, sortBy, order, page, limitData, category)

        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({
            success: true,
            message: 'List all products',
            pageInfo: {
                currentPage: parseInt(page),
                nextPage: nextPage <= totalPage ? nextPage : null,
                totalPage,
                prevPage: prevPage >= 1 ? prevPage : null,
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
            results: product                                                  
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
            results: product                                                   
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}



exports.updateProduct = async (req, res) => {
    try {

        const {id} = req.params
        const data = await productModel.findOne(id)

        if(!data){
            throw new Error(`product with id ${id} not found`)
        }

        if(req.file){
            if(data.image){                                                                             // jika data sebelumnya mempunyai gambar, maka gambar akan di hapus dan di ganti dengna gambar yg baru di upload
                const imagePath = path.join(global.path, 'uploads', 'products', data.image)             // mengambil jalur path gambar        
                console.log(imagePath)
                await fs.rm(imagePath)                                                                  // menghapus file berdasarkan jalur path
            }
            console.log(req.file)
            req.body.image = req.file.filename
        }
    
        const product = await productModel.update(parseInt(id), req.body)
        if(product === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                message: product                                                 
            })
        }
        return res.json({                                                              
            success: true,
            message: 'update product successfully',
            results: product                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const product = await productModel.delete(parseInt(req.params.id))
        if(product.image){
            const imagePath = path.join(global.path, "uploads", "products", product.image)              // mengambil jalur path image
            console.log(imagePath)
            await fs.rm(imagePath)                                                                      // menghapus file berdasarkan jalur path
        }
        return res.json({                                                              
            success: true,
            message: 'delete product successfully',
            results: product                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}