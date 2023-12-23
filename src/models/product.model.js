const db = require('../lib/db.lib')
const { isExist, isStringExist, updateColumn } = require('../moduls/handling')


exports.findAll = async (searchKey='', sortBy="id", order='ASC', page, limit, category) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"

    const limitData = limit
    const offset = (page - 1) * limitData

    // if search by category start
    if(category){
        if(typeof category === "object"){

            if(typeof sortBy === "object"){

                const sql = `
                SELECT 
                "p".*, "c"."name" AS "productCategory", sum("pr"."rate")/count("pr"."id") as "rating"
                FROM "products" "p"
                JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
                JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
                JOIN "categories" "c" on ("c"."id" = "pc"."categoryId")
                WHERE "p"."name" ILIKE $1 AND (${category.map(item => `"c"."name" = '${item}'`).join(' OR ')})
                GROUP BY "p"."id", "c"."name"
                ORDER BY ${sortBy.map(item => `"${item}" ${order}`).join(', ')}
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
            "p".*, "c"."name" AS "productCategory", sum("pr"."rate")/count("pr"."id") as "rating"
            FROM "products" "p"
            JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
            JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
            JOIN "categories" "c" on ("c"."id" = "pc"."categoryId")
            WHERE "p"."name" ILIKE $1 AND (${category.map(item => `"c"."name" = '${item}'`).join(' OR ')})
            GROUP BY "p"."id", "c"."name"
            ORDER BY "${sortBy}" ${order}
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
            SELECT 
            "p".*, "c"."name" AS "productCategory", sum("pr"."rate")/count("pr"."id") as "rating"
            FROM "products" "p"
            JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
            JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
            JOIN "categories" "c" on ("c"."id" = "pc"."categoryId")
            WHERE "p"."name" ILIKE $1 AND "c"."name" = '${category}'
            GROUP BY "p"."id" , "c"."name"
            ORDER BY ${sortBy.map(item => `"${item}" ${order}`).join(', ')}
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
        "p".*, "c"."name" AS "productCategory", sum("pr"."rate")/count("pr"."id") as "rating"
        FROM "products" "p"
        JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
        JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
        JOIN "categories" "c" on ("c"."id" = "pc"."categoryId")
        WHERE "p"."name" ILIKE $1 AND "c"."name" = '${category}'
        GROUP BY "p"."id", "c"."name"
        ORDER BY "${sortBy}" ${order}
        LIMIT ${limitData} OFFSET ${offset}
        `
        const values =[`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found`)
        }
        return rows
    }
    // if search by category end


    if(sortBy === "categories"){
        const sql = `
        SELECT 
        "p".*, "categories"."name" AS "category", sum("pr"."rate")/count("pr"."id") as "rating"
        FROM "products" "p"
        JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
        JOIN "productCategories" "pc" ON ("pc"."productId" = "p"."id")
        JOIN "categories" ON ("categories"."id" = "pc"."categoryId")
        WHERE "p"."name" ILIKE $1
        GROUP BY "p"."id", "categories"."name"
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
             SELECT 
             "p".*, "categories"."name" AS "category", sum("pr"."rate")/count("pr"."id") as "rating"
             FROM "products" "p"
             JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
             JOIN "productCategories" "pc" ON ("pc"."productId" = "p"."id")
             JOIN "categories" ON ("categories"."id" = "pc"."categoryId")
             WHERE "p"."name" ILIKE $1
             GROUP BY "p"."id", "categories"."name"
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
        SELECT "p".*, sum("pr"."rate")/count("pr"."id") as "rating"
        FROM "products" "p" 
        JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
        WHERE "p"."name" ILIKE $1
        GROUP BY "p"."id"
        ORDER BY ${sortBy.map(item => `"${item}" ${order}`).join(', ')}
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
    SELECT "p".*, sum("pr"."rate")/count("pr"."id") as "rating"
    FROM "products" "p" 
    JOIN "productRatings" "pr" ON ("pr"."productId" = "p"."id")
    WHERE "p"."name" ILIKE $1
    GROUP BY "p"."id"
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limitData} OFFSET ${offset}
    `
    const values =[`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found`)
    }
    return rows
}


exports.countAll = async (searchKey='', category) => {
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
        const sql = `SELECT COUNT("id") AS "counts" FROM "products" WHERE "name" ILIKE $1`
        const values = [`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        return rows[0].counts
}



exports.findOne = async (id) => {
    const sql = `
    SELECT *
    FROM "products" where "id" = $1
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