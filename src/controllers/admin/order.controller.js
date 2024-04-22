const orderModel = require('../../models/order.model')
const { errorHandler, updateColumn, isStringExist } = require('../../moduls/handling')
const moment = require('moment')

exports.getAllOrders = async (req, res) => {
  try {
    const { sortBy, order, page = 1, limit } = req.query
    const limitData = parseInt(limit) || 4

    const count = await orderModel.countAll(undefined, undefined)
    const listOrders = await orderModel.findAll(undefined, sortBy, order, page, limitData)

    const totalPage = Math.ceil(count / limitData)
    const nextPage = parseInt(page) + 1
    const prevPage = parseInt(page) - 1

    return res.json({
      success: true,
      message: 'List all orders',
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

exports.getDetailOrder = async (req, res) => {
  try {
    const order = await orderModel.findOne(req.params.id)
    return res.json({
      success: true,
      message: 'detail order',
      results: order
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.createOrder = async (req, res) => {
  try {
    const { id: userId } = req.user
    const status = 'On Progress'

    const date = moment(new Date())
    const orderNumber = `${date.format('YY')}${date.format('M').padStart(2, '0')}${date.format('D').padStart(2, '0')}${Math.floor(Math.random() * 1000)}`

    const order = await orderModel.insert(userId, orderNumber, status, req.body)
    return res.json({
      success: true,
      message: 'create order successfully',
      results: order
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.updateOrder = async (req, res) => {
  try {
    await orderModel.findOne(req.params.id)
    if (req.body.orderNumber) {
      await isStringExist('orders', 'orderNumber', req.body.orderNumber)
    }
    const order = await updateColumn(req.params.id, req.body, 'orders')
    return res.json({
      success: true,
      message: 'update order successfully',
      results: order
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    const order = await orderModel.delete(req.params.id)
    return res.json({
      success: true,
      message: 'delete order successfully',
      results: order
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}
