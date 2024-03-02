const db = require('../lib/db.lib')


exports.findAll = async (searchKey='', sortBy="id", order="ASC", page, limit) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const offset = (page - 1) * limit

    const sql = `
    SELECT *
    FROM "sizes"
    WHERE "size" ILIKE $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`data sizes not found`)
    }
    return rows
}



exports.countAll = async (searchKey='') => {
    const sql = `SELECT COUNT("id") AS "counts" FROM "sizes" WHERE "size" ILIKE $1`
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    return rows[0].counts
}



exports.findOne = async (id) => { 
    const sql = `SELECT * FROM "sizes" WHERE "id" = $1`
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`size with id ${id} not found`)
    }
    return rows[0]
}



exports.insert = async ({size, additionalPrice=0}) => {
    const sql = `INSERT INTO "sizes"("size", "additionalPrice") VALUES ($1, $2) RETURNING *`
    const values = [size, additionalPrice]
    const {rows} = await db.query(sql, values)
    return rows[0]
}



exports.delete = async (id) => {
    const sql = `DELETE FROM "sizes" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`size with id ${id} not found`)
    }
    return rows[0]
}