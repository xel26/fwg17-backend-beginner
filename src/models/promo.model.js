const db = require('../lib/db.lib')
const { isExist, findBy, isStringExist } = require('../moduls/handling')


exports.findAll = async () => {
    const sql = `SELECT * FROM "promo" ORDER BY "id"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => {
    if(data.id){
        return result = await findBy("promo", "id", data.id)
    }else if(data.name){
        return result = await findBy("promo", "name", data.name)
    }else if(data.code){
        return result = await findBy("promo", "code", data.code)
    }else{
        throw new Error (`cannot find specific data`)
    }
}


exports.insert = async (data) => {
    const sql = `
    INSERT INTO "promo"
    ("name", "code", "description", "percentage", "is_expired", "maximum_promo", "minimum_amount")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `
    const values = [data.name, data.code, data.description, data.percentage, data.is_expired, data.maximum_promo, data.minimum_amount]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, data) => {
    const queryId = await isExist("promo", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `UPDATE "promo"promo SET "is_expired" = $2 WHERE "id" = $1 RETURNING *`
    const values = [id, data.is_expired]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const queryId = await isExist("promo", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "promo" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}