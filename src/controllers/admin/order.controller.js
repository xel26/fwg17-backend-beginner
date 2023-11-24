const orderModel = require('../../models/order.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllOrders = async (req, res) => {       
    const {searchKey, sortBy, order, page} = req.query      
    try {
        const listOrders = await orderModel.findAll(searchKey, sortBy, order, page)
        return res.json({                                                              
            success: true,
            messages: `List all users`,
            results: listOrders                                                    
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getDetailOrder = async (req, res) => {                                        
    try {
        const order = await orderModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            messages: 'detail order',
            result: order                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createOrder = async (req, res) => {
    try {
        const order = await orderModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create order successfully',
            result: order                                                   
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.updateOrder = async (req, res) => {
    try {
        const order = await orderModel.update(parseInt(req.params.id), req.body)
        if(order === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                messages: order                                                 
            })
        }
        return res.json({                                                              
            success: true,
            messages: 'update order successfully',
            result: order                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deleteOrder = async (req, res) => {
    try {
        const order = await orderModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete order successfully',
            result: order                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}