const db = require('../lib/db.lib')
const { isExist, findBy } = require('../moduls/handling')


exports.findAll = async () => {
    const sql = `SELECT * FROM "product_size" ORDER BY "id"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => { 
    if(data.id){
        return result = await findBy("product_size", "id", data.id)
    }else if(data.size){
        return result = await findBy("product_size", "size", data.size)
    }else if(data.additional_price){
        return result = await findBy("product_size", "additional_price", data.additional_price)
    }else{
        throw new Error (`cannot find specific data`)
    }
}


exports.insert = async (data) => {
    const sql = `
    INSERT INTO "product_size"
    ("size", "additional_price")
    VALUES
    ($1, $2)
    RETURNING *
    `
    const values = [data.size, data.additional_price]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, data) => {
    const queryId = await isExist("product_size", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `UPDATE "product_size" SET "additional_price" = $2 WHERE "id" = $1 RETURNING *`
    const values = [id, data.additional_price]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const queryId = await isExist("product_size", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "product_size" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}