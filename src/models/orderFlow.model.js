
const db = require('../lib/db.lib')

exports.insertOrder = async (userId, promoId, deliveryAddress, fullName, email) => {
    let uniqueNumber
    while (true) {                                                                          // agar hanya menghasilkan 3 angka bulat
        uniqueNumber = Math.ceil(Math.random() * 1000)
        if(uniqueNumber.toString().length === 3){
            break
        }
    }

    const orderNumber = `${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${uniqueNumber}`
    const sql = `
    INSERT INTO "orders"("userId", "orderNumber", "promoId", "deliveryAddress", "fullName", "email")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `
    const values = [userId, orderNumber, promoId, deliveryAddress, fullName, email]
    const {rows} = await db.query(sql, values)
    console.log(rows[0])
    return rows[0]
}


// exports.insertOrder = async (userId, promoId, deliveryAddress, fullName, email) => {
//     const sql = `
//     INSERT INTO "orders"("userId", "promoId", "deliveryAddress", "fullName", "email")
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING *
//     `
//     const values = [userId, promoId, deliveryAddress, fullName, email]
//     const {rows} = await db.query(sql, values)
//     console.log(rows[0])
//     return rows[0]
// }


// exports.insertOrderNumber = async (id) => {
//     // const orderNumber = `${new Date().getFullYear()}${id}`
//     const orderNumber = `hjhjhjhj`;

//     const sql = `UPDATE "orders" SET "orderNumber" = $1 RETURNING *`
//     const values = [orderNumber]
//     const {rows} = await db.query(sql, values)
//     console.log(rows[0])
//     return rows[0]
// }


exports.findByColumn = async (searcKey, column, table) => {
    const sql = `SELECT "id" FROM "${table}" WHERE "${column}" = $1`
    const values = [searcKey]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.findById = async (id, column, table) => {
    const sql = `SELECT "${column}" FROM "${table}" WHERE "id" = $1`
    const values = [id]
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


exports.countSubtotal = async (id) => {
    const sql = `
    update "orderDetails" set "subtotal" = (
        select (("p"."basePrice" - "p"."discount") * "od"."quantity") + "s"."additionalPrice" + "v"."additionalPrice"
        from "orderDetails" "od"
        join "products" "p" on ("p"."id" = "od"."productId")
        join "sizes" "s" on ("s"."id" = "od"."sizeId")
        join "variant" "v" on ("v"."id" = "od"."variantId")
        where "od"."id" = $1
    )
    where "id" = $1
    RETURNING *
    `
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.countTotal = async (id) => {
    const sql = `
    update "orders" set "total" = (select sum("subtotal") from "orderDetails" where "orderId" = $1) + (select "taxAmount" from "orders" where "id" = $1)
    where "id" = $1
    RETURNING *
    `
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}



exports.countGrandTotal = async (id) => {
    const sql = `
    update "orders" set "grandTotal" = (select "total" from "orders" where "id" = $1)
    where "id" = $1
    RETURNING *
    `
    const values = [id]
    const {rows} = await db.query(sql, values)
    console.log
    return rows[0]
}



exports.countPriceCut = async (id) => {
    const sql = `
    update "orders" set "priceCut" = (
        select "o"."total" * "pro"."percentage"
        from "orders" "o"
        join "promo" "pro" on ("pro"."id" = "o"."promoId")
        where "o"."id" = $1
    )
    where "id" = $1
    RETURNING *
    `
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}



exports.countGrandTotalWithPriceCut = async (id) => {
    const sql = `
    update "orders" set "grandTotal" = (select "total" from "orders" where "id" = $1) - (select "priceCut" from "orders" where "id" = $1)
    where "id" = $1
    RETURNING *
    `
    const values = [id]
    const {rows} = await db.query(sql, values)
    console.log
    return rows[0]
}


