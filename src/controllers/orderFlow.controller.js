
const db = require('../lib/db.lib')
const orderFlowModel = require('../models/orderFlow.model')
const {errorHandler} = require('../moduls/handling')

exports.orderProducts = async (req, res) => {
    try {
        await db.query('BEGIN')
        const {id} = req.user
        let {codePromo:promoId, deliveryAddress, fullName, email} = req.body

        
        if(promoId){
            const promo = await orderFlowModel.findByColumn(promoId, "code", "promo")
            promoId = promo.id
        }

        if(!deliveryAddress){
            const Useraddress = await orderFlowModel.findById(id, "address", "users")
            deliveryAddress = Useraddress.address
        }

        if(!fullName){
            const UserFullName = await orderFlowModel.findById(id, "fullName", "users")
            fullName = UserFullName.fullName
        }
        
        if(!email){
            const userEmail = await orderFlowModel.findById(id, "email", "users")
            email = userEmail.email
        }

        const order = await orderFlowModel.insertOrder(id, promoId, deliveryAddress, fullName, email)
        
        // await orderFlowModel.insertOrderNumber(order.id)


        const {productId, sizeId, variantId, quantity} = req.body

        for(let i = 0; i < productId.length; i++){
            const orderDetails = await orderFlowModel.insertOrderDetails(                            
                order.id,
                productId[i],
                sizeId[i],
                variantId[i],
                quantity[i]
              );

              await orderFlowModel.countSubtotal(orderDetails.id) 
        }

        await orderFlowModel.countTotal(order.id)                                                    


        let results = await orderFlowModel.countGrandTotal(order.id)
        if(promoId){
            await orderFlowModel.countPriceCut(order.id)                                             
            results = await orderFlowModel.countGrandTotalWithPriceCut(order.id)                      
        }


        // await db.query('COMMIT')

        return res.json({
            success: true, 
            message: `create order success`,
            results: results
        })

    } catch (error) {
        console.log(error)
        await db.query('ROLLBACK')
        return errorHandler(error, res)
    }
}