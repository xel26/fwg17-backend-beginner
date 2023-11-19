const orderModel = require('../models/order.model')
const { errorHandler, errorWithCode, listAllData } = require('../moduls/handling')


exports.getAllOrders = async (req, res) => {       
    return results = await listAllData(orderModel, "orders", res)
}


exports.getDetailOrder = async (req, res) => {                                        
    try {
        const listOrders = await orderModel.findOne(req.body)
        return res.json({                                                              
            success: true,
            messages: 'detail order',
            results: listOrders                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createOrder = async (req, res) => {
    try {
        const listOrders = await orderModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create order successfully',
            results: listOrders                                                   
        })
        
    } catch (error) {
        return errorWithCode(error, res, 'order number already exist')
    }
}


exports.updateOrder = async (req, res) => {
    try {
        const listOrders = await orderModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update order successfully',
            results: listOrders                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteOrder = async (req, res) => {
    try {
        const listOrders = await orderModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete order successfully',
            results: listOrders                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}