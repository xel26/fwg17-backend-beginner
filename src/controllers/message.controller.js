const messageModel = require('../models/message.model')
const { errorHandler, listAllData } = require('../moduls/handling')


exports.getAllMessages = async (req, res) => {       
    return results = await listAllData(messageModel, "message", res)
}


exports.getDetailMessage = async (req, res) => {                                        
    try {
        const listMessages = await messageModel.findOne(req.body)
        return res.json({                                                              
            success: true,
            messages: 'detail message',
            results: listMessages                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createMessage = async (req, res) => {
    try {
        const listMessages = await messageModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create message successfully',
            results: listMessages                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, '')
    }
}


exports.updateMessage = async (req, res) => {
    try {
        const listMessages = await messageModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update message successfully',
            results: listMessages                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteMessage = async (req, res) => {
    try {
        const listMessages = await messageModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete message successfully',
            results: listMessages                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}