const db = require('../lib/db.lib')
const { isExist, findBy, isStringExist } = require('../moduls/handling')


exports.findAll = async () => {
    const sql = `SELECT * FROM "tags" ORDER BY "id"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => {                                                                             // mencari data berdasarkan column dengan constraint unique
    if(data.id){
        return result = await findBy("tags", "id", data.id)
    }else if(data.name){
        return result = await findBy("tags", "name", data.name)
    }else{
        throw new Error (`cannot find specific data`)
    }
}


exports.insert = async (data) => {
    const queryString = await isStringExist("tags", "name", data.name)
    if(queryString){
        throw new Error(isStringExist)
    }

    const sql = `
    INSERT INTO "tags"
    ("name")
    VALUES
    ($1)
    RETURNING *
    `
    const values = [data.name]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, data) => {
    const queryId = await isExist("tags", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `UPDATE "tags" SET "name" = $2 WHERE "id" = $1 RETURNING *`
    const values = [id, data.name]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const queryId = await isExist("tags", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "tags" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}