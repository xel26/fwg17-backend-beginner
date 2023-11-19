const db = require('../lib/db.lib')
const { isExist, findBy } = require('../moduls/handling')


exports.findAll = async () => {
    const sql = `SELECT * FROM "message" ORDER BY "id"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => {                                                                             
    if(data.id){
        return result = await findBy("message", "id", data.id)
    }else{
        throw new Error (`cannot find specific data`)
    }
}


exports.insert = async (data) => {
    const sql = `
    INSERT INTO "message"
    ("recipient_id", "sender_id", "text")
    VALUES
    ($1, $2, $3)
    RETURNING *
    `
    const values = [data.recipient_id, data.sender_id, data.text]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, data) => {
    const queryId = await isExist("message", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `UPDATE "message" SET "text" = $2 WHERE "id" = $1 RETURNING *`
    const values = [id, data.text]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const queryId = await isExist("message", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "message" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}