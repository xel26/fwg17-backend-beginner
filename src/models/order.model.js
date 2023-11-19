const db = require('../lib/db.lib')
const { isExist, findBy } = require('../moduls/handling')



exports.findAll = async () => {
    const sql = `SELECT * FROM "orders" ORDER BY "id"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => {
    if(data.id){
        return result = await findBy("orders", "id", data.id)
    }else if(data.order_number){
        return result = await findBy("orders", "order_number", data.order_number)
    }else{
        throw new Error (`cannot find specific data`)
    }
}


exports.insert = async (data) => {
    const sql = `
    INSERT INTO "orders"
    ("user_id", "order_number", "promo_id", "delivery_address", "full_name", "email")
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `
    const values = [data.user_id, data.order_number, data.promo_id, data.delivery_address, data.full_name, data.email]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, data) => {
    const queryId = await isExist("orders", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `UPDATE "orders" SET "status" = $2 WHERE "id" = $1 RETURNING *`
    const values = [id, data.status]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const queryId = await isExist("orders", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "orders" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}