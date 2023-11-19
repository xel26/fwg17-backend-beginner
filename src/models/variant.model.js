const db = require('../lib/db.lib')
const { isExist, findBy, isStringExist } = require('../moduls/handling')


exports.findAll = async () => {
    const sql = `SELECT * FROM "variant" ORDER BY "id"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => {
    if(data.id){
        return result = await findBy("variant", "id", data.id)
    }else if(data.name){
        return result = await findBy("variant", "name", data.name)
    }else{
        throw new Error (`cannot find specific data`)
    }
}


exports.insert = async (data) => {
    const queryString = await isStringExist("variant", "name", data.name)
    if(queryString){
        throw new Error(isStringExist)
    }

    const sql = `
    INSERT INTO "variant"
    ("name", "additional_price")
    VALUES
    ($1, $2)
    RETURNING *
    `
    const values = [data.name, data.additional_price]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, data) => {
    const queryId = await isExist("variant", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `UPDATE "variant" SET "additional_price" = $2 WHERE "id" = $1 RETURNING *`
    const values = [id, data.additional_price]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const queryId = await isExist("variant", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "variant" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}