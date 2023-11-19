const db = require('../lib/db.lib')
const { isExist, findBy } = require('../moduls/handling')


exports.findAll = async () => {
    const sql = `SELECT * FROM "product_tags" ORDER BY "id"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => {
    if(data.id){
        return result = await findBy("product_tags", "id", data.id)
    }else{
        throw new Error (`cannot find specific data`)
    }
}


exports.insert = async (data) => {
    const sql = `
    INSERT INTO "product_tags"
    ("product_id", "tag_id")
    VALUES
    ($1, $2)
    RETURNING *
    `
    const values = [data.product_id, data.tag_id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, data) => {
    const queryId = await isExist("product_tags", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `UPDATE "product_tags" SET "tag_id" = $2 WHERE "id" = $1 RETURNING *`
    const values = [id, data.tag_id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const queryId = await isExist("product_tags", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "product_tags" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}