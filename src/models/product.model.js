const db = require('../lib/db.lib')
const { isExist, findBy, isStringExist } = require('../moduls/handling')


exports.findAll = async () => {
    const sql = `SELECT * FROM "products" ORDER BY "id"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => {                                                                                     // mencari data berdasarkan column dengan constraint unique
    if(data.id){
        return result = await findBy("products", "id", data.id)
    }else if(data.name){
        return result = await findBy("products", "name", data.name)
    }else {
        throw new Error(`cannot find specific data`)
    }
}


exports.insert = async (data) => {
    const queryString = await isStringExist("products", "name", data.name)
    if(queryString){
        throw new Error(isStringExist)
    }

    const sql = `
    INSERT INTO "products"
    ("name", "description", "base_price", "image", "discount", "is_recommended")
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `
    const values = [data.name, data.description, data.base_price, data.image, data.discount, data.is_recommended]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, data) => {
    const queryId = await isExist("products", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `UPDATE "products" SET "base_price" = $2 WHERE "id" = $1 RETURNING *`
    const values = [id, data.base_price]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const queryId = await isExist("products", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "products" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}