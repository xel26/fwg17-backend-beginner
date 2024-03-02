const messageModel = require('../../models/message.model')
const { errorHandler, updateColumn } = require('../../moduls/handling')


exports.getAllMessages = async (req, res) => {
    try {
        const {sortBy, order, page=1, limit} = req.query
        const limitData = parseInt(limit) || 5

        const count = await messageModel.countAll()
        const listMessages = await messageModel.findAll(sortBy, order, page, limitData)

        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({                                                              
            success: true,
            message: `List all messages`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage >= 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listMessages                                                    
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.getDetailMessage = async (req, res) => {
    try {
        const message = await messageModel.findOne(req.params.id)
        return res.json({                                                              
            success: true,
            message: 'detail message',
            result: message                                                  
        })
    } catch (error) {
        return errorHandler(error, res)
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
        return errorHandler(error, res)
    }
}


exports.updateMessage = async (req, res) => {
    try {
        await messageModel.findOne(req.params.id)
        const message = await updateColumn(req.params.id, req.body, "message")
        return res.json({                                                              
            success: true,
            message: 'update message successfully',
            result: message                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}


exports.deleteMessage = async (req, res) => {
    try {
        const message = await messageModel.delete(req.params.id) 
        return res.json({                                                              
            success: true,
            message: 'delete message successfully',
            result: message                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}