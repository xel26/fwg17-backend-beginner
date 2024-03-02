const db = require('../lib/db.lib')

exports.findAll = async (searchKey='', sortBy="id", order='ASC', page, limit,) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const offset = (page - 1) * limit

    const sql = `
    SELECT
    "t"."id",
    "t"."fullName",
    "t"."role",
    "t"."feedback",
    "t"."rate",
    "t"."image"
    FROM "testimonial" "t"
    WHERE "fullName" ILIKE $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values =[`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`data testimonial not found`)
    }
    return rows
}


exports.countAll = async (searchKey='') => {
    const sql = `SELECT COUNT("id") AS "counts" FROM "testimonial" WHERE "fullName" ILIKE $1`
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    return rows[0].counts
}


exports.findOne = async (id) => {
    const sql = ` SELECT * FROM "testimonial" WHERE "id" = $1`
    let values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`testimonial with id ${id} not found`)
    }
    return rows[0]
}


exports.insert = async ({fullName, role, feedback, rate}) => {
    const sql = `
    INSERT INTO "testimonial" ("fullName", "role", "feedback", "rate")
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `
    const values = [fullName, role, feedback, rate]
    const {rows} = await db.query(sql, values)
    return rows[0]
}



exports.delete = async (id) => {
    const sql = `DELETE FROM "testimonial" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`testimonial with id ${id} not found`)
    }
    return rows[0]
}