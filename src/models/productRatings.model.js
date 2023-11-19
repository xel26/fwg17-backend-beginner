const db = require('../lib/db.lib')
const { isExist, findBy } = require('../moduls/handling')


exports.findAll = async () => {
    const sql = `SELECT * FROM "product_ratings" ORDER BY "id"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => {                                                                             // mencari data berdasarkan column dengan constraint unique
    if(data.id){
        return result = await findBy("product_ratings", "id", data.id)
    }else{
        throw new Error (`cannot find specific data`)
    }
}


exports.insert = async (data) => {
    if(data.rate <= 0 || data.rate > 5){
        throw new Error(`Invalid data. Please rate the product on a scale from 1 to 5`)
    }

    const sql = `
    INSERT INTO "product_ratings"
    ("product_id", "rate", "review_message", "user_id")
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `
    const values = [data.product_id, data.rate, data.review_message, data.user_id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, data) => {
    const queryId = await isExist("product_ratings", id)
    if(queryId){
        throw new Error(queryId)
    }

    const sql = `UPDATE "product_ratings" SET "rate" = $2, "review_message" = $3 WHERE "id" = $1 RETURNING *`
    const values = [id, data.rate, data.review_message]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const queryId = await isExist("product_ratings", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "product_ratings" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}