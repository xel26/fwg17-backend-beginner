const orderDetailsModel = require('../../models/orderDetails.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllOrderDetail = async (req, res) => {       
    const {sortBy, order, page} = req.query      
    try {
        const listOrderDetails = await orderDetailsModel.findAll(sortBy, order, page)
        return res.json({                                                              
            success: true,
            message: `List all orderDetails`,
            results: listOrderDetails                                                    
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getDetailOrderDetail = async (req, res) => {                                        
    try {
        const orderDetails = await orderDetailsModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            message: 'detail orderDetails',
            result: orderDetails                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createOrderDetail = async (req, res) => {
    try {
        const orderDetails = await orderDetailsModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create orderDetails successfully',
            result: orderDetails                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, '')
    }
}


exports.updateOrderDetail = async (req, res) => {
    try {
        const orderDetails = await orderDetailsModel.update(parseInt(req.params.id), req.body) 
        if(orderDetails === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                message: orderDetails                                                 
            })
        }
        return res.json({                                                              
            success: true,
            message: 'update order details successfully',
            result: orderDetails                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteOrderDetail = async (req, res) => {
    try {
        const orderDetails = await orderDetailsModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            message: 'delete orderDetails successfully',
            result: orderDetails                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}