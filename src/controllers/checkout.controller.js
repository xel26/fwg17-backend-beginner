const db = require('../lib/db.lib')
const moment = require('moment')

const checkoutModel = require('../models/checkout.model')
const { errorHandler } = require('../moduls/handling')

exports.getDataSize = async (req, res) => {
  try {
    const size = await checkoutModel.getDataSize(req.query.name)
    return res.json({
      success: true,
      message: 'data size',
      results: size
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.getDataVariant = async (req, res) => {
  try {
    const size = await checkoutModel.getDataVariant(req.query.name)
    return res.json({
      success: true,
      message: 'data variant',
      results: size
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.getOrderProducts = async (req, res) => {
  const { id: userId } = req.user

  try {
    const { orderId } = req.query

    const listOrderDetails = await checkoutModel.getOrderProducts(orderId, userId)

    return res.json({
      success: true,
      message: 'list all order products',
      results: listOrderDetails
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.createOrder = async (req, res) => {
  try {
    await db.query('BEGIN')

    const { id: userId } = req.user
    const { productId, sizeProduct, variantProduct, quantityProduct, deliveryShipping } = req.body
    let { deliveryAddress, fullName, email } = req.body

    const idProduct = productId.split(',')
    const size = sizeProduct.split(',')
    const variant = variantProduct.split(',')
    const quantity = quantityProduct.split(',')

    const date = moment(new Date())
    const orderNumber = `${date.format('YY')}${date.format('M').padStart(2, '0')}${date.format('D').padStart(2, '0')}${Math.floor(Math.random() * 1000)}`

    const status = 'On Progress'
    const deliveryFee = 5000

    if (!deliveryAddress) {
      deliveryAddress = await checkoutModel.getDeliveryAddress(userId)
    }

    if (!fullName) {
      fullName = await checkoutModel.getFullName(userId)
    }

    if (!email) {
      email = await checkoutModel.getEmail(userId)
    }

    let order = await checkoutModel.insertOrder(userId, orderNumber, deliveryFee, status, deliveryShipping, deliveryAddress, fullName, email)

    for (let i = 0; i < idProduct.length; i++) {
      try {
        const sizeId = await checkoutModel.getDataSize(size[i])
        const variantId = await checkoutModel.getDataVariant(variant[i])
        const orderDetails = await checkoutModel.insertOrderDetails(order.id, parseInt(idProduct[i]), sizeId.id, variantId.id, parseInt(quantity[i]))
        await checkoutModel.countSubtotal(orderDetails.id)
      } catch (error) {
        await db.query('ROLLBACK')
        return errorHandler(error, res)
      }
    }

    await checkoutModel.countTotal(order.id)
    await checkoutModel.countTax(order.id)
    order = await checkoutModel.countTotalTransaction(order.id)

    await db.query('COMMIT')

    return res.json({
      success: true,
      message: 'create order successfully',
      results: order
    })
  } catch (error) {
    await db.query('ROLLBACK')
    return errorHandler(error, res)
  }
}
