const db = require('../lib/db.lib')
const { isExist, findBy } = require('../moduls/handling')


exports.findAll = async () => {
    const sql = `SELECT * FROM "order_details" ORDER BY "id"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => {                                                                             // mencari data berdasarkan column dengan constraint unique
    if(data.id){
        return result = await findBy("order_details", "id", data.id)
    }else{
        throw new Error (`cannot find specific data`)
    }
}


exports.insert = async (data) => {
    const sql = `
    INSERT INTO "order_details"
    ("product_id", "product_size_id", "product_variant_id", "quantity", "order_id", "subtotal")
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `
    const values = [data.product_id, data.product_size_id, data.product_variant_id, data.quantity, data.order_id, data.subtotal]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id) => {
    const queryId = await isExist("order_details", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `update "order_details" set "subtotal" = (
        select (("p"."base_price" - "p"."discount") * "od"."quantity") + "ps"."additional_price" + "pv"."additional_price"
        from "order_details" "od"
        join "products" "p" on ("p"."id" = "od"."product_id")
        join "product_size" "ps" on ("ps"."id" = "od"."product_size_id")
        join "product_variant" "pv" on ("pv"."id" = "od"."product_variant_id")
        where "od"."id" = $1
    )
    where "id" = $1
    returning *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const queryId = await isExist("order_details", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "order_details" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}