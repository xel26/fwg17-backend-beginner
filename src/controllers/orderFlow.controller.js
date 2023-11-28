
const db = require('../lib/db.lib')
const orderFlowModel = require('../models/orderFlow.model')
const {errorHandler} = require('../moduls/handling')

exports.orderProducts = async (req, res) => {
    const {rows}= await db.query('select "orderNumber" from "orders"')
    console.log(rows)
    try {
        await db.query('BEGIN')
        const {id} = req.user
        const {promoId, deliveryAddress, fullName, email} = req.body

        const order = await orderFlowModel.insertOrder(id, promoId, deliveryAddress, fullName, email)
        
        await orderFlowModel.insertOrderNumber(order.id)

        const products = [                                                                           
            {
                id: 1,
                sizeId: 2,
                variantId: 5,
                quantity: 2,
            },
            {
                id: 2,
                sizeId: 3,
                variantId: 5,
                quantity: 2,
            },
            {
                id: 3,
                sizeId: 2,
                variantId: 5,
                quantity: 3,
            }
        ]

        for (const product of products) {
            const orderDetails = await orderFlowModel.insertOrderDetails(                            
                order.id,
                product.id,
                product.sizeId,
                product.variantId,
                product.quantity
              );

              await orderFlowModel.countSubtotal(orderDetails.id)                                    
        }


        await orderFlowModel.countTotal(order.id)                                                    

        let result = await orderFlowModel.countGrandTotal(order.id)

        if(promoId){
            await orderFlowModel.countPriceCut(order.id)                                             
            result = await orderFlowModel.countGrandTotalWithPriceCut(order.id)                      
        }




        // await db.query('COMMIT')

        return res.json({
            success: true, 
            message: `create order success`,
            result: result
        })

    } catch (error) {
        console.log(error)
        await db.query('ROLLBACK')
        errorHandler(error, res)
    }
}