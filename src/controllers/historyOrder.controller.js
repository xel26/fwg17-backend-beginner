const orderModel = require('../models/order.model')
const checkoutModel = require('../models/checkout.model')
const { errorHandler } = require('../moduls/handling')



exports.getAllHistoryOrder = async (req, res) => {  
    try {
        const {id: userId} = req.user     
        const {sortBy, order, page=1, limit, status} = req.query
        const limitData = parseInt(limit) || 4

        const count = await orderModel.countAll(userId, status)      
        const listOrders = await orderModel.findAll(userId, sortBy, order, page, limitData, status)
        
        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({                                                              
            success: true,
            message: `List all history order`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage >= 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listOrders                                                    
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}



exports.getDetailHistoryOrder = async (req, res) => {                                        
    try {
        const {id: userId} = req.user
        const order = await orderModel.findOne(req.params.id, userId)
        return res.json({                                                              
            success: true,
            message: 'detail history order',
            results: order                                                  
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}



exports.getHistoryOrderProducts = async (req, res) => { 
    
    try {
        const {id: userId} = req.user
        const {orderId} = req.query
     
        const listProducts = await checkoutModel.getOrderProducts(orderId, userId)

        return res.json({                                                              
            success: true,
            message: `list all history order products`,
            results: listProducts                                                    
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}