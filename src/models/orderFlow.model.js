// masih ada bug. tidak bisa menggunakna destructuring untuk mengakses data,
//penyebab belum di ketahui, sehingga masih menggunakan cara manual untuk mengakses data


const db = require('../lib/db.lib')

exports.insertOrder = async (userId, orderNumber, promoId, deliveryAddress, fullName, email) => {
    const sql = `
    INSERT INTO "orders"("userId", "orderNumber", "promoId", "deliveryAddress", "fullName", "email")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `
    const values = [userId, orderNumber, promoId, deliveryAddress, fullName, email]
    const result = db.query(sql, values)
    return result
}


exports.insertOrderDetails = async (orderId, productId, sizeId, variantId, quantity) => {
    const sql = `
    INSERT INTO "orderDetails"("orderId", "productId", "sizeId", "variantId", "quantity")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `
    const values = [orderId, productId, sizeId, variantId, quantity]
    const result = db.query(sql, values)
    return result
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
    const result = db.query(sql, values)
    return result
}


exports.countTotal = async (id) => {
    const sql = `
    update "orders" set "total" = (select sum("subtotal") from "orderDetails" where "orderId" = $1) + (select "taxAmount" from "orders" where "id" = $1)
    where "id" = $1
    RETURNING *
    `
    const values = [id]
    const result = db.query(sql, values)
    return result
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
    const result = db.query(sql, values)
    return result
}


exports.countGrandTotal = async (id) => {
    const sql = `
    update "orders" set "grandTotal" = (select "total" from "orders" where "id" = $1) - (select "priceCut" from "orders" where "id" = $1)
    where "id" = $1
    RETURNING *
    `
    const values = [id]
    const result = db.query(sql, values)
    console.log
    return result
}