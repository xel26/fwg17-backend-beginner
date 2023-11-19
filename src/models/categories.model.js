const db = require('../lib/db.lib')
const { isExist, findBy, isStringExist } = require('../moduls/handling')


exports.findAll = async () => {
    const sql = `SELECT * FROM "categories" ORDER BY "id"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => {
    if(data.id){
        return result = await findBy("categories", "id", data.id)
    }else if(data.name){
        return result = await findBy("categories", "name", data.name)
    }else{
        throw new Error (`cannot find specific data`)
    }
}


exports.insert = async (data) => {
    const queryString = await isStringExist("categories", "name", data.name)
    if(queryString){
        throw new Error(isStringExist)
    }

    const sql = `
    INSERT INTO "categories"
    (name)
    VALUES
    ($1)
    RETURNING *
    `
    const values = [data.name]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, data) => {
    const queryId = await isExist("categories", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `UPDATE "categories" SET "name" = $2 WHERE "id" = $1 RETURNING *`
    const values = [id, data.name]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const queryId = await isExist("categories", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "categories" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}