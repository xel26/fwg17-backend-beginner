const db = require('../lib/db.lib')
const { isExist, findBy } = require('../moduls/handling')


exports.findAll = async (sortBy="id", order="ASC", page=1) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limit = 10
    const offset = (page - 1) * limit

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'productId', 'sizeId', 'variantId', 'quantity', 'orderId', 'subtotal', 'createdAt']
        let columnSort = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT *
        FROM "orderDetails"
        ORDER BY ${columnSort.join(', ')}
        LIMIT ${limit} OFFSET ${offset}
        `
        const values = []
        const {rows} = await db.query(sql, values)
        return rows
    }

    const sql = `
    SELECT *
    FROM "orderDetails"
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    console.log(sql)
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (id) => {                                                                             // mencari data berdasarkan column dengan constraint unique
    const sql = `
    SELECT *
    FROM "orderDetails" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`orderDetails with id ${id} not found `)
    }
    return rows[0]
}


exports.insert = async (body) => {
    const sql = `
    INSERT INTO "order_details"
    ("productId", "sizeId", "variantId", "quantity", "orderId", "subtotal")
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `
    const values = [body.productId, body.sizeId, body.variantId, body.quantity, body.orderId, body.subtotal]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id) => {
    const queryId = await isExist("orderDetails", id)
    if(queryId){
        throw new Error(queryId)
    }

    return await updateColumn(id, body, "orderDetails")

    // const sql = `update "order_details" set "subtotal" = (
    //     select (("p"."base_price" - "p"."discount") * "od"."quantity") + "ps"."additional_price" + "pv"."additional_price"
    //     from "order_details" "od"
    //     join "products" "p" on ("p"."id" = "od"."product_id")
    //     join "product_size" "ps" on ("ps"."id" = "od"."product_size_id")
    //     join "product_variant" "pv" on ("pv"."id" = "od"."product_variant_id")
    //     where "od"."id" = $1
    // )
    // where "id" = $1
    // returning *`
    // const values = [id]
    // const {rows} = await db.query(sql, values)
    // return rows[0]
}


exports.delete = async (id) => {
    const queryId = await isExist("orderDetails", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "orderDetails" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}