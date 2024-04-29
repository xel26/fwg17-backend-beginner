const db = require('../lib/db.lib')

exports.findAll = async (searchKey = '', sortBy = 'id', order = 'ASC', page, limit) => {
  const orderType = ['ASC', 'DESC']
  order = orderType.includes(order) ? order : 'ASC'

  const offset = (page - 1) * limit

  const sql = `
    SELECT *
    FROM "variant" WHERE "name" ilike $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
  const values = [`%${searchKey}%`]
  const { rows } = await db.query(sql, values)
  if (!rows.length) {
    throw new Error('data variants not found')
  }
  return rows
}

exports.countAll = async (searchKey = '') => {
  const sql = 'SELECT COUNT("id") AS "counts" FROM "variant" WHERE "name" ILIKE $1'
  const values = [`%${searchKey}%`]
  const { rows } = await db.query(sql, values)
  return rows[0].counts
}

exports.findOne = async (id) => {
  const sql = `
    SELECT *
    FROM "variant" WHERE "id" = $1
    `
  const values = [id]
  const { rows } = await db.query(sql, values)
  if (!rows.length) {
    throw new Error(`variant with id ${id} not found`)
  }
  return rows[0]
}

exports.insert = async ({ name, additionalPrice = 0 }) => {
  const sql = `
    INSERT INTO "variant"("name", "additionalPrice")
    VALUES ($1, $2) RETURNING *`
  const values = [name, additionalPrice]
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.delete = async (id) => {
  const sql = 'DELETE FROM "variant" WHERE "id" = $1 RETURNING *'
  const values = [id]
  const { rows } = await db.query(sql, values)
  if (!rows.length) {
    throw new Error(`variant with id ${id} not found`)
  }
  return rows[0]
}
