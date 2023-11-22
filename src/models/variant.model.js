const db = require('../lib/db.lib')
const { isExist, findBy, isStringExist } = require('../moduls/handling')


exports.findAll = async () => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limit = 10
    const offset = (page - 1) * limit

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'name', 'additionalPrice', 'createdAt']
        let columnSort = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT *
        FROM "variant" WHERE "name" ILIKE $1
        ORDER BY ${columnSort.join(', ')}
        LIMIT ${limit} OFFSET ${offset}
        `
        const values = [`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        return rows
    }

    const sql = `
    SELECT *
    FROM "variant" WHERE "name" ilike $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    console.log(sortBy)
    console.log(sql)
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (id) => {
    const sql = `
    SELECT *
    FROM "variant" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`variant with id ${id} not found `)
    }
    return rows[0]
}


exports.insert = async (data) => {
    const queryString = await isStringExist("variant", "name", data.name)
    if(queryString){
        throw new Error(isStringExist)
    }

    const sql = `
    INSERT INTO "variant" ("name", "additionalPrice")
    VALUES ($1, $2) RETURNING *`
    const values = [data.name, data.additionalPrice]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, data) => {
    const queryId = await isExist("variant", id)
    if(queryId){
        throw new Error(queryId)
    }

    if(body.name){
        const queryString =  await isStringExist("variant", "name", body.name)                                       // melakukan query terlebih dahulu sebelum memasukan data, untuk mengecek apakah ada data string yg sama tapi hanya berbeda huruf kecil dan huruf besarnya saja.
        if(queryString){
            throw new Error (queryString)
        } 
    }

    return await updateColumn(id, body, "variant")
}


exports.delete = async (id) => {
    const queryId = await isExist("variant", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "variant" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}