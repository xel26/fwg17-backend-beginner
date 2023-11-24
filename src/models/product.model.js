const db = require('../lib/db.lib')
const { isExist, isStringExist, updateColumn } = require('../moduls/handling')


exports.findAll = async (searchKey='', sortBy="id", order="ASC", page=1) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"

    const limit = 100
    const offset = (page - 1) * limit

    if(sortBy === "categories"){
        const sql = `
        SELECT 
        "p"."id", "p"."name", "p"."description", "p"."basePrice", "p"."image",
        "p"."discount", "p"."isRecommended", "p"."createdAt", "categories"."name" AS "category"
        FROM "products" "p"
        JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
        JOIN "categories" on ("categories"."id" = "pc"."categoryId")
        WHERE "p"."name" ILIKE $1
        ORDER BY "${sortBy}"."name" ${order}
        LIMIT ${limit} OFFSET ${offset}
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
        const sortByColumn = ["id", "name", "basePrice", "createdAt", "categories"]
        const columnSort = []

        if(sortBy.includes("categories")){
            sortBy.map(item => {
                if(sortByColumn.includes(item)){
                    if(item === "categories"){
                        columnSort.push(`"${item}"."name" ${order}`)
                        return
                    }
                 columnSort.push(`"p"."${item}" ${order}`)
                }
             })
             
             const sql = `
             SELECT 
             "p"."id", "p"."name", "p"."description", "p"."basePrice", "p"."image",
             "p"."discount", "p"."isRecommended", "p"."createdAt", "categories"."name" AS "category"
             FROM "products" "p"
             JOIN "productCategories" "pc" on ("pc"."productId" = "p"."id")
             JOIN "categories" on ("categories"."id" = "pc"."categoryId")
             WHERE "p"."name" ILIKE $1
             ORDER BY ${columnSort.join(', ')}
             LIMIT ${limit} OFFSET ${offset}
             `
             console.log(sql)
             const values =[`%${searchKey}%`]
             const {rows} = await db.query(sql, values)
             if(!rows.length){
                 throw new Error(`no data found`)
             }
             return rows
        }
        
        sortBy.map(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
        
        const sql = `
        SELECT * 
        FROM "products" WHERE "name" ILIKE $1
        ORDER BY ${columnSort.join(', ')}
        LIMIT ${limit} OFFSET ${offset}
        `
        const values =[`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found`)
        }
        return rows
    }

    const sql = `
    SELECT *
    FROM "products" WHERE "name" ILIKE $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values =[`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found`)
    }
    return rows
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


exports.insert = async (body) => {
    const queryString = await isStringExist("products", "name", body.name)
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
    const values = [body.name, body.description, body.basePrice, body.image, body.discount, body.isRecommended]
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