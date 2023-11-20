const userModel = require('../models/user.model')
const { errorHandler } = require('../moduls/handling')


exports.getAllUsers = async (req, res) => { 
    const {searchKey, sortBy, order, page} = req.query      
    try {
        const listData = await userModel.findAll(searchKey, sortBy, order, page)
        return res.json({                                                              
            success: true,
            messages: `List all users`,
            results: listData                                                    
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({                                                              
            success: false,
            messages: `Internal server error`                                                    
        })
    }
}


exports.getDetailUser = async (req, res) => {                                        
    try {
        const listUsers = await userModel.findOne(req.body)
        return res.json({                                                              
            success: true,
            messages: 'detail user',
            results: listUsers                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createUser = async (req, res) => {
    try {
        const listUsers = await userModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create user successfully',
            results: listUsers                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.updateUser = async (req, res) => {
    try {
        if(req.body.role){
            throw new Error(`access denied cannot change role user`)
        }
    
        const listUsers = await userModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update user successfully',
            results: listUsers                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const listUsers = await userModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete user successfully',
            results: listUsers                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}