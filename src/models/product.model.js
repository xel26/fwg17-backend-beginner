const db = require('../lib/db.lib')
const { isExist, isStringExist, updateColumn } = require('../moduls/handling')


exports.findAll = async (searchKey='', sortBy="id", order='ASC', page, limit, category, isRecommended) => {
    order = sortBy == "createdAt" ? "DESC" : order

    const limitData = limit
    const offset = (page - 1) * limitData

    const sql = `
    SELECT "p".*,
    "c"."name" AS "productCategory",
    "t"."name" as "tag",
    sum("pr"."rate")/count("pr"."id") as "rating"
    FROM "products" "p" 
    LEFT JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
    LEFT JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
    LEFT JOIN "categories" "c" on ("c"."id" = "pc"."categoryId")
    LEFT join "tags" "t" on ("t"."id" = "p"."tagId")
    WHERE "p"."name" ILIKE $1 ${isRecommended ? 'AND "isRecommended" = true' : ''} ${category ? `AND "c"."name" = ${category}` : ''}
    GROUP BY "p"."id", "c"."name", "t"."name"
    ORDER BY "p"."${sortBy}" ${order}
    LIMIT ${limitData} OFFSET ${offset}
    `
    const values =[`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found`)
    }
    return rows
}


exports.countAll = async (searchKey='', category, isRecommended) => {
        const sql = `
        SELECT COUNT("p"."id") AS "counts"
        FROM "products" "p"
        LEFT JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
        LEFT JOIN "categories" "c" on ("c"."id" = "pc"."categoryId")
        WHERE "p"."name" ILIKE $1 ${isRecommended ? 'AND "isRecommended" = true' : ''} ${category ? `AND "c"."name" = ${category}` : ''}
        `
        const values = [`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        return rows[0].counts
}



exports.findOne = async (id) => {
    const sql = `
    SELECT
    "p"."id",
    "p"."name",
    "p"."description",
    "p"."basePrice",
    "p"."image",
    "p"."discount",
    "p"."createdAt",
    "p"."isRecommended",
    "t"."name" as "tag",
    sum("pr"."rate")/count("pr"."id") AS "rating",
    count(DISTINCT "pr"."id") AS "review",
    JSONB_AGG(
        DISTINCT JSONB_BUILD_OBJECT(
            'id', "v"."id",
            'name', "v"."name",
            'additionalPrice', "v"."additionalPrice"
        )
    ) AS "variantsProduct",
    JSONB_AGG(
        DISTINCT JSONB_BUILD_OBJECT(
            'id', "pi"."id",
            'imageUrl', "pi"."imageUrl"
        )
    ) AS "productImages",
    JSONB_AGG(
        DISTINCT JSONB_BUILD_OBJECT(
            'id', "c"."id",
            'name', "c"."name"
        )
    ) AS "productCategory"
    FROM "products" "p"
    LEFT JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
    LEFT JOIN "tags" "t" on ("t"."id" = "p"."tagId")
    LEFT JOIN "productVariant" "pv" on ("pv"."productId" = "p"."id")
    LEFT JOIN "variant" "v" on ("pv"."variantId" = "v"."id")
    LEFT JOIN "productImages" "pi" on ("pi"."productId" = "p"."id")
    LEFT JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
    LEFT JOIN "categories" "c" on ("c"."id" = "pc"."categoryId")
    WHERE "p"."id" = $1
    GROUP BY "p"."id", "t"."name"
    `
    let values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`product with id ${id} not found`)
    }
    return rows[0]
}


exports.insert = async ({name, description, basePrice, image, discount=0, isRecommended}) => {
    const sql = `
    INSERT INTO "products"
    ("name", "description", "basePrice", "image", "discount", "isRecommended")
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `
    const values = [name, description, basePrice, image, discount, isRecommended]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.insertImages = async ({imageUrl, productId}) => {
    const sql = `INSERT INTO "productImages" ("imageUrl", "productId") VALUES ($1, $2) RETURNING*`
    const values = [imageUrl, productId]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    return await updateColumn(id, body, "products")
}


exports.delete = async (id) => {
    const sql = `DELETE FROM "products" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}