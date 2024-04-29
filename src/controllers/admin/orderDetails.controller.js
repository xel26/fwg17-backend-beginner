const orderDetailsModel = require('../../models/orderDetails.model')
const { errorHandler, updateColumn } = require('../../moduls/handling')

exports.getAllOrderDetail = async (req, res) => {
  try {
    const { sortBy, order, page = 1, limit } = req.query
    const limitData = parseInt(limit) || 5

    const count = await orderDetailsModel.countAll()
    const listOrderDetails = await orderDetailsModel.findAll(sortBy, order, page, limitData)

    const totalPage = Math.ceil(count / limitData)
    const nextPage = parseInt(page) + 1
    const prevPage = parseInt(page) - 1

    return res.json({
      success: true,
      message: 'List all orderDetails',
      pageInfo: {
        currentPage: parseInt(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage >= 1 ? prevPage : null,
        totalData: parseInt(count)
      },
      results: listOrderDetails
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.getDetailOrderDetail = async (req, res) => {
  try {
    const orderDetails = await orderDetailsModel.findOne(req.params.id)
    return res.json({
      success: true,
      message: 'detail orderDetails',
      results: orderDetails
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.createOrderDetail = async (req, res) => {
  try {
    const orderDetails = await orderDetailsModel.insert(req.body)
    return res.json({
      success: true,
      message: 'create orderDetails successfully',
      results: orderDetails
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.updateOrderDetail = async (req, res) => {
  try {
    await orderDetailsModel.findOne(req.params.id)
    const orderDetails = await updateColumn(req.params.id, req.body, 'orderDetails')

    return res.json({
      success: true,
      message: 'update orderDetails successfully',
      results: orderDetails
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.deleteOrderDetail = async (req, res) => {
  try {
    const orderDetails = await orderDetailsModel.delete(req.params.id)
    return res.json({
      success: true,
      message: 'delete orderDetails successfully',
      results: orderDetails
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}
