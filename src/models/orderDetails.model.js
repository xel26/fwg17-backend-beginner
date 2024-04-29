const db = require('../lib/db.lib')

exports.findAll = async (sortBy = 'id', order = 'ASC', page, limit) => {
  const orderType = ['ASC', 'DESC']
  order = orderType.includes(order) ? order : 'ASC'

  const offset = (page - 1) * limit

  const sql = `
    SELECT *
    FROM "orderDetails"
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
  const values = []
  const { rows } = await db.query(sql, values)
  if (!rows.length) {
    throw new Error('data orderDetails not found')
  }
  return rows
}

exports.countAll = async () => {
  const sql = 'SELECT COUNT("id") AS "counts" FROM "orderDetails"'
  const values = []
  const { rows } = await db.query(sql, values)
  return rows[0].counts
}

exports.findOne = async (id) => { // mencari data berdasarkan column dengan constraint unique
  const sql = 'SELECT * FROM "orderDetails" WHERE "id" = $1'
  const values = [id]
  const { rows } = await db.query(sql, values)
  if (!rows.length) {
    throw new Error(`orderDetails with id ${id} not found`)
  }
  return rows[0]
}

exports.deleteByOrderId = async (orderId) => { // mencari data berdasarkan column dengan constraint unique
  const sql = 'DELETE FROM "orderDetails" WHERE "orderId" = $1 RETURNING *'
  const values = [orderId]
  const { rows } = await db.query(sql, values)
  if (!rows.length) {
    throw new Error(`orderDetails with orderId ${orderId} not found`)
  }
  return rows[0]
}

exports.insert = async (body) => {
  const sql = `
    INSERT INTO "orderDetails"
    ("productId", "sizeId", "variantId", "quantity", "orderId")
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING *
    `
  const values = [body.productId, body.sizeId, body.variantId, body.quantity, body.orderId]
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.delete = async (id) => {
  const sql = 'DELETE FROM "orderDetails" WHERE "id" = $1 RETURNING *'
  const values = [id]
  const { rows } = await db.query(sql, values)
  if (!rows.length) {
    throw new Error(`orderDetails with id ${id} not found`)
  }
  return rows[0]
}
