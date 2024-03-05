const db = require('../lib/db.lib')


exports.findAll = async (sortBy="id", order="ASC", page, limit) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const offset = (page - 1) * limit

    const sql = `
    SELECT *
    FROM "message"
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values = []
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`data messages not found`)
    }
    return rows
}


exports.countAll = async () => {
    const sql = `SELECT COUNT("id") AS "counts" FROM "message"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows[0].counts
}


exports.findOne = async (id) => {
    const sql = `SELECT * FROM "message" WHERE "id" = $1`
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`message with id ${id} not found`)
    }
    return rows[0]
}


exports.insert = async (body) => {
    const sql = `
    INSERT INTO "message" ("recipientId", "senderId", "text")
    VALUES ($1, $2, $3) RETURNING *
    `
    const values = [body.recipientId, body.senderId, body.text]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const sql = `DELETE FROM "message" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`message with id ${id} not found`)
    }
    return rows[0]
}