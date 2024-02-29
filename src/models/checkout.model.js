const db = require('../lib/db.lib')

exports.getDataSize = async (name) => {
    const sql = `
    SELECT *
    FROM "sizes" WHERE "size" ILIKE $1
    `
    const  values = [name]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`size ${name} not found`)
    }
    return rows[0]
}

exports.getDataVariant = async (name) => {
    const sql = `
    SELECT *
    FROM "variant" WHERE "name" ILIKE $1
    `
    const  values = [name]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`variant ${name} not found`)
    }
    return rows[0]
}

exports.getOrderProducts = async (orderId, userId) => {
        const sql = `
        SELECT
        "od"."id",
        "od"."quantity",
        "od"."orderId",
        "p"."name" AS "productName",
        "p"."image",
        "p"."basePrice",
        "p"."discount",
        "t"."name" AS "tag",
        "s"."size",
        "v"."name" AS "variant",
        "o"."deliveryShipping"
        FROM "orderDetails" "od"
        JOIN "products" "p" on ("p"."id" = "od"."productId")
        LEFT JOIN "tags" "t" on ("t"."id" = "p"."tagId")
        JOIN "sizes" "s" on ("s"."id" = "od"."sizeId")
        JOIN "variant" "v" on ("v"."id" = "od"."variantId")
        JOIN "orders" "o" on ("o"."id" = "od"."orderId")
        WHERE "od"."orderId" = $1 AND "o"."userId" = $2
        `
        const values = [orderId, userId]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found`)
        }
        return rows
}


exports.getDeliveryAddress = async (userId) => {
    const sql = `select "address" from "users" where "id" = $1`
    const values = [userId]
    const {rows} = await db.query(sql, values)
    return rows[0].address
}


exports.getFullName = async (userId) => {
    const sql = `select "fullName" from "users" where "id" = $1`
    const values = [userId]
    const {rows} = await db.query(sql, values)
    return rows[0].fullName
}


exports.getEmail = async (userId) => {
    const sql = `select "email" from "users" where "id" = $1`
    const values = [userId]
    const {rows} = await db.query(sql, values)
    return rows[0].email
}


exports.insertOrder = async (userId, orderNumber, deliveryFee, status, deliveryShipping, deliveryAddress, fullName, email) => {
    const sql = `
    INSERT INTO "orders"
    ("userId", "orderNumber", "deliveryFee", "status", "deliveryShipping", "deliveryAddress", "fullName", "email")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `
    const values = [userId, orderNumber, deliveryFee, status, deliveryShipping, deliveryAddress, fullName, email]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.insertOrderDetails = async (orderId, productId, sizeId, variantId, quantity) => {
    const sql = `
    INSERT INTO "orderDetails"("orderId", "productId", "sizeId", "variantId", "quantity")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `
    const values = [orderId, productId, sizeId, variantId, quantity]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.countSubtotal = async(orderDetailsId) => {
    const sql = `
    update "orderDetails" set "subtotal" = (
        select (("p"."basePrice" - "p"."discount" + "s"."additionalPrice" + "v"."additionalPrice") * "od"."quantity")
        from "orderDetails" "od"
        join "products" "p" on ("p"."id" = "od"."productId")
        join "sizes" "s" on ("s"."id" = "od"."sizeId")
        join "variant" "v" on ("v"."id" = "od"."variantId")
        where "od"."id" = $1
    )
    where "id" = $1
    RETURNING *
    `
    const values = [orderDetailsId]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.countTotal = async(orderId) => {
    const sql = `
    update "orders" set "total" = (select sum("subtotal") from "orderDetails" where "orderId" = $1)
    where "id" = $1
    RETURNING *
    `
    const values = [orderId]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.countTax = async (orderId) => {
    const sql = `
    update "orders" set "tax" = (select ("total" * 0.025) from "orders" where "id" = $1)
    where "id" = $1
    RETURNING *
    `
    const values = [orderId]
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.countTotalTransaction = async(id) => {
    const sql = `
    UPDATE "orders" set "subtotal" = (select "total" from "orders" where "id" = $1) + (select "tax" from "orders" where "id" = $1) + (select "deliveryFee" from "orders" where "id" = $1)
    WHERE "id" = $1
    RETURNING *
    `
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}