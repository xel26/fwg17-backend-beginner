// masih ada bug. tidak bisa menggunakna destructuring untuk mengakses data,
//penyebab belum di ketahui, sehingga masih menggunakan cara manual untuk mengakses data


const db = require('../lib/db.lib')
const orderFlowModel = require('../models/orderFlow.model')

exports.orderProducts = async (req, res) => {
    try {
        await db.query('BEGIN')
        const {id} = req.user

        const {orderNumber, promoId, deliveryAddress, fullName, email} = req.body

        const order = await orderFlowModel.insertOrder(id, orderNumber, promoId, deliveryAddress, fullName, email)                              // 1. membuat order

        const products = [                                                                                                                      // masih menggunakan object manual
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
            const orderDetails = await orderFlowModel.insertOrderDetails(                                                                         // 2. membuat detail orders
                order.rows[0].id,
                product.id,
                product.sizeId,
                product.variantId,
                product.quantity
              );

              await orderFlowModel.countSubtotal(orderDetails.rows[0].id)                                                                         // 3. menghitung subtotal dari masing-masing product
        }


        await orderFlowModel.countTotal(order.rows[0].id)                                                                                        // 4. menghitung total (menjumlahkan semua subtotal)

        let result = await orderFlowModel.countGrandTotal(order.rows[0].id)

        if(promoId){
            await orderFlowModel.countPriceCut(order.rows[0].id)                                                                                // 5. menghitung potongan harga jika ada
            result = await orderFlowModel.countGrandTotalWithPriceCut(order.rows[0].id)                                                                   // 6. menghitung total akhir (total dikurang potongan harga)
        }




        await db.query('COMMIT')

        return res.json({
            success: true, 
            message: `create order success`,
            result: result.rows[0]
        })

    } catch (error) {
        console.log(error)
        await db.query('ROLLBACK')
        if(error.code === '23505'){
            return res.status(500).json({
                success: false, 
                message: `rollback; ${error.detail.replaceAll(/[()="]/g, ' ').replace('Key', 'data with')}`,
            })
        }else if(error.code === '23502'){
            return res.status(500).json({
                success: false, 
                message: `rollback; column ${error.column} cannot be empty`,
            })
        }
        return res.status(500).json({
            success: false, 
            message: `rollback`,
        })
    }
}