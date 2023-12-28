const db = require('../lib/db.lib')
const { isExist, updateColumn } = require('../moduls/handling')

exports.findAll = async (searchKey='', sortBy="id", order='ASC', page, limit,) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"

    const limitData = limit
    const offset = (page - 1) * limitData

    if(typeof sortBy === "object"){
        const sql = `
        SELECT "t"."id", "t"."fullName", "t"."role", "t"."feedback", "t"."rate", "t"."image"
        FROM "testimonial" "t"
        WHERE "fullName" ILIKE $1
        ORDER BY ${sortBy.map(item => `"${item}" ${order}`).join(', ')}
        LIMIT ${limitData} OFFSET ${offset}
        `
        const values =[`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found`)
        }
        return rows
    }

    const sql = `
    SELECT "t"."id", "t"."fullName", "t"."role", "t"."feedback", "t"."rate", "t"."image"
    FROM "testimonial" "t"
    WHERE "fullName" ILIKE $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limitData} OFFSET ${offset}
    `
    const values =[`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found`)
    }
    return rows
}


exports.countAll = async (searchKey='') => {
    const sql = `SELECT COUNT("id") AS "counts" FROM "testimonial" WHERE "fullName" ILIKE $1`
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found`)
    }
    return rows[0].counts
}


exports.findOne = async (id) => {
    const sql = `
    SELECT "t"."id", "t"."fullName", "t"."role", "t"."feedback", "t"."rate", "t"."image"
    FROM "testimonial" "t"
    WHERE "id" = $1
    `
    let values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`testimonial with id ${id} not found`)
    }
    return rows[0]
}


exports.update = async (id, body) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isExist("testimonial", id)                                                                     // melakukan query terlebih dahulu sebelum update, untuk mengecek apakah data yg ingin di update ada di database
    if(queryId){
        throw new Error(queryId)
    }

    return await updateColumn(id, body, "testimonial")
}