const userModel = require('../models/user.model')


exports.getAllUsers = async (req, res) => {                                            
    try {
        const listUsers = await userModel.findAll()
        return res.json({                                                              
            success: true,
            messages: 'List all users',
            results: listUsers                                                    
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({                                                              
            success: false,
            messages: `data not found`                                                    
        })
    }
}


exports.getDetailUser = async (req, res) => {        
    const id = parseInt(req.params.id)                                     
    try {
        const listUsers = await userModel.findOne(id)
        if(!listUsers){
            return res.status(404).json({                                                          
                success: false,
                messages: `user with id ${id} not found!`                                                
            })
        }

        return res.json({                                                              
            success: true,
            messages: 'detail user',
            results: listUsers                                                  
        })

    } catch (error) {
        return res.status(500).json({                                                              
            success: false,
            messages: `Internal server error`                                                     
        })
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
        console.log(error)
        if(error.code === "23502"){
            return res.status(400).json({                                                              
                success: false,
                messages: `${error.column} cannot be empty`                                                 
            })
        }
        return res.status(500).json({                                                              
            success: false,
            messages: `Internal server error`                                                 
        })
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
        console.log(error)
        return res.status(500).json({                                                              
            success: true,
            messages: 'Internal server error',                                                  
        })
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
        console.log(error)
        return res.status(500).json({                                                              
            success: true,
            messages: 'Internal server error',                                                  
        })
    }
}