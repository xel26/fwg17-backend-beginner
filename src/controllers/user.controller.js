const userModel = require('../models/user.model')
const { errorHandler, errorWithCode, listAllData } = require('../moduls/handling')


exports.getAllUsers = async (req, res) => {       
    return results = await listAllData(userModel, "users", res)
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
        return errorWithCode(error, res, 'phone number already registered')
    }
}


exports.updateUser = async (req, res) => {
    try {
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