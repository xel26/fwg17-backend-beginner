const db = require('../lib/db.lib')
const { isExist, isStringExist, updateColumn } = require('../moduls/handling')


exports.findAll = async (searchKey='', sortBy="id", order='ASC', page, limit, category, isRecommended) => {
    // const orderType = ["ASC", "DESC"]
    // order = orderType.includes(order)? order : "ASC"
    order = sortBy == "createdAt" ? "DESC" : order


    const limitData = limit
    const offset = (page - 1) * limitData

    // if search by category start
    if(category){
        if(typeof category === "object"){

            if(typeof sortBy === "object"){

                const sql = `
                SELECT
                "p"."id", "p"."name", "p"."description", "p"."basePrice", "p"."image", "p"."discount", "p"."createdAt",
                "c"."name" AS "productCategory", "t"."name" as "tag", sum("pr"."rate")/count("pr"."id") as "rating"
                FROM "products" "p"
                LEFT JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
                LEFT JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
                LEFT JOIN "categories" "c" on ("c"."id" = "pc"."categoryId")
                LEFT join "tags" "t" on ("t"."id" = "p"."tagId")
                WHERE "p"."name" ILIKE $1 AND (${category.map(item => `"c"."name" = '${item}'`).join(' OR ')})
                GROUP BY "p"."id", "c"."name", "t"."name"
                ORDER BY ${sortBy.map(item => `"p"."${item}" ${order}`).join(', ')}
                LIMIT ${limitData} OFFSET ${offset}
                `
                console.log(sql)
                const values =[`%${searchKey}%`]
                const {rows} = await db.query(sql, values)
                if(!rows.length){
                    throw new Error(`no data found`)
                }
                return rows
            }


            const sql = `
            SELECT 
            "p"."id", "p"."name", "p"."description", "p"."basePrice", "p"."image", "p"."discount",
            "c"."name" AS "productCategory", 
            "t"."name" as "tag", sum("pr"."rate")/count("pr"."id") as "rating"
            FROM "products" "p"
            LEFT JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
            LEFT JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
            LEFT JOIN "categories" "c" on ("c"."id" = "pc"."categoryId")
            LEFT join "tags" "t" on ("t"."id" = "p"."tagId")
            WHERE "p"."name" ILIKE $1 AND (${category.map(item => `"c"."name" = '${item}'`).join(' OR ')})
            GROUP BY "p"."id", "c"."name", "t"."name"
            ORDER BY "p"."${sortBy}" ${order}
            LIMIT ${limitData} OFFSET ${offset}
            `
            console.log(sql)
            const values =[`%${searchKey}%`]
            const {rows} = await db.query(sql, values)
            if(!rows.length){
                throw new Error(`no data found`)
            }
            return rows
        }

        if(typeof sortBy === "object"){

            const sql = `
            SELECT "p"."id", "p"."name", "p"."description", "p"."basePrice", "p"."image", "p"."discount",
            "c"."name" AS "productCategory", "t"."name" as "tag", sum("pr"."rate")/count("pr"."id") as "rating"
            FROM "products" "p"
            LEFT JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
            LEFT JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
            LEFT JOIN "categories" "c" on ("c"."id" = "pc"."categoryId")
            LEFT join "tags" "t" on ("t"."id" = "p"."tagId")
            WHERE "p"."name" ILIKE $1 AND "c"."name" = '${category}'
            GROUP BY "p"."id", "c"."name", "t"."name"
            ORDER BY ${sortBy.map(item => `"p"."${item}" ${order}`).join(', ')}
            LIMIT ${limitData} OFFSET ${offset}
            `
            console.log(sql)
            const values =[`%${searchKey}%`]
            const {rows} = await db.query(sql, values)
            if(!rows.length){
                throw new Error(`no data found`)
            }
            return rows
        }

        const sql = `
        SELECT "p"."id", "p"."name", "p"."description", "p"."basePrice", "p"."image", "p"."discount", 
        "c"."name" AS "productCategory", "t"."name" as "tag", sum("pr"."rate")/count("pr"."id") as "rating"
        FROM "products" "p"
        LEFT JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
        LEFT JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
        LEFT JOIN "categories" "c" on ("c"."id" = "pc"."categoryId")
        LEFT join "tags" "t" on ("t"."id" = "p"."tagId")
        WHERE "p"."name" ILIKE $1 AND "c"."name" = '${category}'
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
    // search by category end


    if(sortBy === "categories"){
        const sql = `
        SELECT "p"."id", "p"."name", "p"."description", "p"."basePrice", "p"."image", "p"."discount",
        "categories"."name" AS "category", "t"."name" as "tag", sum("pr"."rate")/count("pr"."id") as "rating"
        FROM "products" "p"
        LEFT JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
        LEFT JOIN "productCategories" "pc" ON ("pc"."productId" = "p"."id")
        LEFT JOIN "categories" ON ("categories"."id" = "pc"."categoryId")
        LEFT join "tags" "t" on ("t"."id" = "p"."tagId")
        WHERE "p"."name" ILIKE $1
        GROUP BY "p"."id", "categories"."name", "t"."name"
        ORDER BY "${sortBy}"."name" ${order}
        LIMIT ${limitData} OFFSET ${offset}
        `
        console.log(sql)
        const values =[`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found`)
        }
        return rows
    }

    if(typeof sortBy === "object"){

        if(sortBy.includes("categories")){
            const columnSort = []
            sortBy.map((item) => {
              if (item === "categories") {
                columnSort.push(`"${item}"."name" ${order}`);
                return;
              }
              columnSort.push(`"p"."${item}" ${order}`);
            });
             
             const sql = `
             SELECT "p"."id", "p"."name", "p"."description", "p"."basePrice", "p"."image", "p"."discount",
             "categories"."name" AS "category", "t"."name" as "tag",  sum("pr"."rate")/count("pr"."id") as "rating"
             FROM "products" "p"
             LEFT JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
             LEFT JOIN "productCategories" "pc" ON ("pc"."productId" = "p"."id")
             LEFT JOIN "categories" ON ("categories"."id" = "pc"."categoryId")
             LEFT join "tags" "t" on ("t"."id" = "p"."tagId")
             WHERE "p"."name" ILIKE $1
             GROUP BY "p"."id", "categories"."name", "t"."name"
             ORDER BY ${columnSort.join(', ')}
             LIMIT ${limitData} OFFSET ${offset}
             `
             console.log(sql)
             const values =[`%${searchKey}%`]
             const {rows} = await db.query(sql, values)
             if(!rows.length){
                 throw new Error(`no data found`)
             }
             return rows
        }
        
        
        const sql = `
        SELECT "p"."id", "p"."name", "p"."description", "p"."basePrice", "p"."image", "p"."discount",
        "t"."name" as "tag", sum("pr"."rate")/count("pr"."id") as "rating"
        FROM "products" "p" 
        LEFT JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
        LEFT join "tags" "t" on ("t"."id" = "p"."tagId")
        WHERE "p"."name" ILIKE $1
        GROUP BY "p"."id", "t"."name"
        ORDER BY ${sortBy.map(item => `"p"."${item}" ${order}`).join(', ')}
        LIMIT ${limitData} OFFSET ${offset}
        `
        const values =[`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found`)
        }
        return rows
    }

    const sql = `
    SELECT "p".*,
    "t"."name" as "tag", sum("pr"."rate")/count("pr"."id") as "rating"
    FROM "products" "p" 
    LEFT JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
    LEFT join "tags" "t" on ("t"."id" = "p"."tagId")
    WHERE "p"."name" ILIKE $1 ${isRecommended ? 'AND "isRecommended" = true' : ''}
    GROUP BY "p"."id", "t"."name"
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
        if(category){
            if(typeof category === "object"){
                const sql = `
                SELECT COUNT("p"."id") AS "counts"
                FROM "products" "p"
                JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
                JOIN "categories" "c" on ("c"."id" = "pc"."categoryId")
                WHERE "p"."name" ILIKE $1 AND (${category.map(item => `"c"."name" = '${item}'`).join(' OR ')})
                `
                const values = [`%${searchKey}%`]
                const {rows} = await db.query(sql, values)
                if(!rows.length){
                    throw new Error(`no data found`)
                }
                return rows[0].counts
            }

            const sql = `
            SELECT COUNT("p"."id") AS "counts"
            FROM "products" "p"
            JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
            JOIN "categories" "c" on ("c"."id" = "pc"."categoryId")
            WHERE "p"."name" ILIKE $1 AND "c"."name" = '${category}' 
            `
            const values = [`%${searchKey}%`]
            const {rows} = await db.query(sql, values)
            return rows[0].counts
        }
        const sql = `SELECT COUNT("id") AS "counts" FROM "products" WHERE "name" ILIKE $1 ${isRecommended ? 'AND "isRecommended" = true' : ''}`
        const values = [`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found`)
        }
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
    count("pr"."id") AS "review",
    JSONB_AGG(
        DISTINCT JSONB_BUILD_OBJECT(
            'id', "v"."id",
            'name', "v"."name",
            'additionalPrice', "v"."additionalPrice"
        )
    ) AS "variantsProduct"
    FROM "products" "p"
    LEFT JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
    LEFT JOIN "tags" "t" on ("t"."id" = "p"."tagId")
    LEFT JOIN "productVariant" "pv" on ("pv"."productId" = "p"."id")
    LEFT JOIN "variant" "v" on ("pv"."variantId" = "v"."id")
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


exports.insert = async ({name, description, basePrice, image, discount=0, isRecommended=false}) => {
    const queryString = await isStringExist("products", "name", name)
    if(queryString){
        throw new Error(isStringExist)
    }

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


exports.update = async (id, body) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isExist("products", id)                                                                     // melakukan query terlebih dahulu sebelum update, untuk mengecek apakah data yg ingin di update ada di database
    if(queryId){
        throw new Error(queryId)
    }

    if(body.name){
        const queryString =  await isStringExist("products", "name", body.name)                                        // melakukan query terlebih dahulu sebelum memasukan data, untuk mengecek apakah ada data string yg sama tapi hanya berbeda huruf kecil dan huruf besarnya saja. 
        if(queryString){
            throw new Error (queryString)
        }
    }

    return await updateColumn(id, body, "products")
}


exports.delete = async (id) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }
    
    const queryId = await isExist("products", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "products" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}