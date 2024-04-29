const db = require('../lib/db.lib')

exports.findAll = async (searchKey = '', sortBy = 'id', order = 'ASC', page, limit) => {
  const orderType = ['ASC', 'DESC']
  order = orderType.includes(order) ? order : 'ASC'

  const offset = (page - 1) * limit

  const sql = `
    SELECT *
    FROM "tags" WHERE "name" ILIKE $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
  const values = [`%${searchKey}%`]
  const { rows } = await db.query(sql, values)
  if (!rows.length) {
    throw new Error('data tags not found')
  }
  return rows
}

exports.countAll = async (searchKey = '') => {
  const sql = 'SELECT COUNT("id") AS "counts" FROM "tags" WHERE "name" ILIKE $1'
  const values = [`%${searchKey}%`]
  const { rows } = await db.query(sql, values)
  return rows[0].counts
}

exports.findOne = async (id) => {
  const sql = ' SELECT * FROM "tags" WHERE "id" = $1'
  const values = [id]
  const { rows } = await db.query(sql, values)
  if (!rows.length) {
    throw new Error(`tag with id ${id} not found`)
  }
  return rows[0]
}

exports.insert = async (body) => {
  const sql = 'INSERT INTO "tags" ("name") VALUES ($1) RETURNING *'
  const values = [body.name]
  const { rows } = await db.query(sql, values)
  return rows[0]
}

exports.delete = async (id) => {
  const sql = 'DELETE FROM "tags" WHERE "id" = $1 RETURNING *'
  const values = [id]
  const { rows } = await db.query(sql, values)
  if (!rows.length) {
    throw new Error(`tag with id ${id} not found`)
  }
  return rows[0]
}
