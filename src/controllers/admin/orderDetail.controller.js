const orderDetailModel = require('../../models/orderDetailModel.model')
const { errorHandler, listAllData } = require('../../moduls/handling')


exports.getAllOrderDetail = async (req, res) => {       
    return results = await listAllData(orderDetailModel, "order_details", res)
}


exports.getDetailOrderDetail = async (req, res) => {                                        
    try {
        const listOrderDetail = await orderDetailModel.findOne(req.body)
        return res.json({                                                              
            success: true,
            messages: 'detail orderDetails',
            results: listOrderDetail                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createOrderDetail = async (req, res) => {
    try {
        const listOrderDetail = await orderDetailModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create order details successfully',
            results: listOrderDetail                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, '')
    }
}


exports.updateOrderDetail = async (req, res) => {
    try {
        const listOrderDetail = await orderDetailModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update order details successfully',
            results: listOrderDetail                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteOrderDetail = async (req, res) => {
    try {
        const listOrderDetail = await orderDetailModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete orderDetails successfully',
            results: listOrderDetail                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}