const db = require('../lib/db.lib')



exports.findAll = async (userId, sortBy="id", order, page, limit, status='') => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"

    const offset = (page - 1) * limit

    const sql = `
    SELECT "o".*,
    array_agg(DISTINCT "p"."image") "productsImage"
    FROM "orders" "o"
    JOIN "orderDetails" "od" ON ("od"."orderId" = "o"."id")
    JOIN "products" "p" ON ("p"."id" = "od"."productId")
    ${userId ? 'WHERE "o"."userId" = $1 AND "o"."status" ILIKE $2' : ''}
    GROUP BY "o"."id"
    ORDER BY ${userId ? '"o"."createdAt" DESC' : `"o"."${sortBy}" ${order}`}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values = userId ? [userId, `%${status}%`] : []
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`${userId ? 'data history order not found' : 'data orders not found'}`)
    }
    return rows
}


exports.countAll = async (userId, status='') => {
    const sql = `
    SELECT COUNT("userId") AS "counts" 
    FROM "orders" ${userId ? 'WHERE "userId" = $1 AND "status" ILIKE $2' : ''}
    `
    const values = userId ? [userId, `%${status}%`] : []
    const {rows} = await db.query(sql, values)
    return rows[0].counts
}


exports.findOne = async (id, userId) => {
    const sql = `SELECT * FROM "orders" WHERE "id" = $1 ${userId ? ` AND "userId" = $2`: ''}`
    const  values = userId ? [id, userId] : [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`${userId ? `user with id ${userId} does not have an order with id ${id}` : `order with id ${id} not found`}`)
    }
    return rows[0]
}



exports.insert = async (userId, orderNumber, status, body) => {
    const sql = `
    INSERT INTO "orders"
    ("userId", "orderNumber", "total", "subtotal", "tax", "deliveryFee", "deliveryShipping", "status", "deliveryAddress", "fullName", "email")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
    `
    const values = [userId, orderNumber, body.total, body.subtotal, body.tax, body.deliveryFee, body.deliveryShipping, status, body.deliveryAddress, body.fullName, body.email]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const sql = `DELETE FROM "orders" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`order with id ${id} not found`)
    }
    return rows[0]
}