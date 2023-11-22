const db = require('../lib/db.lib')
const { isExist, findBy, isStringExist } = require('../moduls/handling')


exports.findAll = async () => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limit = 10
    const offset = (page - 1) * limit

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'name','percentage', 'maximumPromo', 'minimumAmount', 'createdAt']
        let columnSort = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT * 
        FROM "promo" WHERE "name" ILIKE $1
        ORDER BY ${columnSort.join(', ')}
        LIMIT ${limit} OFFSET ${offset}
        `
        const values = [`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        return rows
    }

    const sql = `
    SELECT *
    FROM "promo" WHERE "name" ilike $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    console.log(sql)
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (id) => {
    const sql = `
    SELECT *
    FROM "users" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`promo with id ${id} not found `)
    }
    return rows[0]
}


exports.insert = async (body) => {
    const queryString = await isStringExist("promo", "name", body.email)                                        // melakukan query terlebih dahulu sebelum memasukan data, untuk mengecek apakah ada data string yg sama tapi hanya berbeda huruf kecil dan huruf besarnya saja. 
    if(queryString){
        throw new Error(queryString)
    }

    const sql = `
    INSERT INTO "promo"
    ("name", "code", "description", "percentage", "isExpired", "maximumPromo", "minimumAmount")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `
    const values = [body.name, body.code, body.description, body.percentage, body.isExpired, body.maximumPromo, body.minimumAmount]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    const queryId = await isExist("promo", id)
    if(queryId){
        throw new Error(queryId)
    }

    if(body.name){
        const queryString =  await isStringExist("promo", "name", body.name)                                       // melakukan query terlebih dahulu sebelum memasukan data, untuk mengecek apakah ada data string yg sama tapi hanya berbeda huruf kecil dan huruf besarnya saja.
        if(queryString){
            throw new Error (queryString)
        } 
    }else if(body.code){
        const queryString =  await isStringExist("promo", "code", body.code)                                       // melakukan query terlebih dahulu sebelum memasukan data, untuk mengecek apakah ada data string yg sama tapi hanya berbeda huruf kecil dan huruf besarnya saja.
        if(queryString){
            throw new Error (queryString)
        } 
    }

    return await updateColumn(id, body, "promo")
}


exports.delete = async (id) => {
    const queryId = await isExist("promo", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "promo" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}