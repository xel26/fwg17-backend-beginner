const promoModel = require('../../models/promo.model')
const { errorHandler } = require('../../moduls/handling')
const { isStringExist, updateColumn } = require('../../moduls/handling')

exports.getAllPromo = async (req, res) => {
  try {
    const { searchKey, sortBy, order, page = 1, limit } = req.query
    const limitData = parseInt(limit) || 5

    const count = await promoModel.countAll(searchKey)
    const listPromo = await promoModel.findAll(searchKey, sortBy, order, page, limitData)

    const totalPage = Math.ceil(count / limitData)
    const nextPage = parseInt(page) + 1
    const prevPage = parseInt(page) - 1

    return res.json({
      success: true,
      message: 'List all promo',
      pageInfo: {
        currentPage: parseInt(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage >= 1 ? prevPage : null,
        totalData: parseInt(count)
      },
      results: listPromo
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.getDetailPromo = async (req, res) => {
  try {
    const promo = await promoModel.findOne(req.params.id)
    return res.json({
      success: true,
      message: 'detail promo',
      results: promo
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.createPromo = async (req, res) => {
  try {
    await isStringExist('promo', 'name', req.body.name)
    await isStringExist('promo', 'code', req.body.code)
    const promo = await promoModel.insert(req.body)
    return res.json({
      success: true,
      message: 'create promo successfully',
      results: promo
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.updatePromo = async (req, res) => {
  try {
    await promoModel.findOne(req.params.id)
    await isStringExist('promo', 'name', req.body.name)
    await isStringExist('promo', 'code', req.body.code)
    const promo = await updateColumn(req.params.id, req.body, 'promo')
    return res.json({
      success: true,
      message: 'update promo successfully',
      results: promo
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.deletePromo = async (req, res) => {
  try {
    const promo = await promoModel.delete(req.params.id)
    return res.json({
      success: true,
      message: 'delete promo successfully',
      results: promo
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}
