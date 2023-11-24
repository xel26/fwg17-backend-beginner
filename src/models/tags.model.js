const db = require('../lib/db.lib')
const { isExist, isStringExist, updateColumn } = require('../moduls/handling')


exports.findAll = async (searchKey='', sortBy="id", order="ASC", page=1) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limit = 10
    const offset = (page - 1) * limit

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'name', 'createdAt']
        let columnSort = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT *
        FROM "tags" WHERE "name" ILIKE $1
        ORDER BY ${columnSort.join(', ')}
        LIMIT ${limit} OFFSET ${offset}
        `
        const values = [`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found`)
        }
        return rows
    }

    const sql = `
    SELECT *
    FROM "tags" WHERE "name" ILIKE $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    console.log(sortBy)
    console.log(sql)
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found`)
    }
    return rows
}


exports.findOne = async (id) => {                                                                             // mencari data berdasarkan column dengan constraint unique
    const sql = `
    SELECT *
    FROM "tags" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`tag with id ${id} not found `)
    }
    return rows[0]
}


exports.insert = async (body) => {
    const queryString = await isStringExist("tags", "name", body.name)
    if(queryString){
        throw new Error(queryString)
    }

    const sql = `
    INSERT INTO "tags" ("name") VALUES ($1) RETURNING *`
    const values = [body.name]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isExist("tags", id)
    if(queryId){
        throw new Error(queryId)
    }

    const queryString =  await isStringExist("tags", "name", body.name)                                       // melakukan query terlebih dahulu sebelum memasukan data, untuk mengecek apakah ada data string yg sama tapi hanya berbeda huruf kecil dan huruf besarnya saja.
    if(queryString){
        throw new Error (queryString)
    }
        

    return await updateColumn(id, body, "tags")
}


exports.delete = async (id) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isExist("tags", id)
    if(queryId){
        throw new Error(queryId)
    }
    
    const sql = `DELETE FROM "tags" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}