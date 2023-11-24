const messageModel = require('../../models/message.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllMessages = async (req, res) => {       
    const {sortBy, order, page} = req.query      
    try {
        const listMessages = await messageModel.findAll(sortBy, order, page)
        return res.json({                                                              
            success: true,
            message: `List all messages`,
            results: listMessages                                                    
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getDetailMessage = async (req, res) => {                                        
    try {
        const message = await messageModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            message: 'detail message',
            result: message                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createMessage = async (req, res) => {
    try {
        const message = await messageModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create message successfully',
            result: message                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, '')
    }
}


exports.updateMessage = async (req, res) => {
    try {
        const message = await messageModel.update(parseInt(req.params.id), req.body)
        if(message === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                message: message                                                 
            })
        }
        return res.json({                                                              
            success: true,
            message: 'update message successfully',
            result: message                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteMessage = async (req, res) => {
    try {
        const message = await messageModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            message: 'delete message successfully',
            result: message                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}