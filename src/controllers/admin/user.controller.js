const userModel = require('../../models/user.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllUsers = async (req, res) => { 
    try {
        const {searchKey, sortBy, order, page=1, limit} = req.query
        const limitData = parseInt(limit) || 5

        const count = await userModel.countAll(searchKey)      
        const listUsers = await userModel.findAll(searchKey, sortBy, order, page, limitData)
        
        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({                                                              
            success: true,
            message: `List all users`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage > 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listUsers                                                    
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getDetailUser = async (req, res) => {                                        
    try {
        const user = await userModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            message: 'detail user',
            result: user                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createUser = async (req, res) => {
    try {
        const user = await userModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create user successfully',
            result: user                                                   
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.updateUser = async (req, res) => {
    try {
        // if(req.body.role){
        //     return res.status(403).json({
        //         success: false,
        //         message: 'Forbidden access denied cannot change role user'
        //     })
        // }
    
        const user = await userModel.update(parseInt(req.params.id), req.body)
        if(user === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                message: user                                                 
            })
        }
        return res.json({                                                              
            success: true,
            message: 'update user successfully',
            result: user                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const user = await userModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            message: 'delete user successfully',
            result: user                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}