const db = require('../lib/db.lib')
const { isExist } = require('../moduls/handling')


exports.findAll = async (sortBy="id", order="ASC", page, limit) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const offset = (page - 1) * limit

    const sql = `
    SELECT *
    FROM "productCategories"
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values = []
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`data productCategories not found`)
    }
    return rows
}


exports.countAll = async () => {
    const sql = `SELECT COUNT("id") AS "counts" FROM "productCategories"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows[0].counts
}


exports.findOne = async (id) => {                                                                             
    const sql = `
    SELECT *
    FROM "productCategories" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`productCategory with id ${id} not found`)
    }
    return rows[0]
}


exports.findData = async (productId, categoryId) => {                                                                             
    const sql = ` SELECT * FROM "productCategories" WHERE "productId" = $1 AND "categoryId" = $2`
    const  values = [productId, categoryId]
    const {rows} = await db.query(sql, values)
    if(rows.length){
        throw new Error(`productCategory with productId ${productId} and categoryId ${categoryId} already exist`)
    }
    return rows[0]
}


exports.insert = async (body) => {
    const sql = `
    INSERT INTO "productCategories" ("productId", "categoryId")
    VALUES ($1, $2) RETURNING *
    `
    const values = [body.productId, body.categoryId]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const sql = `DELETE FROM "productCategories" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`productCategory with id ${id} not found`)
    }
    return rows[0]
}