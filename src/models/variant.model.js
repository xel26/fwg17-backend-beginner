const db = require('../lib/db.lib')
const { isExist, isStringExist, updateColumn } = require('../moduls/handling')


exports.findAll = async (searchKey='', sortBy="id", order="ASC", page, limit) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limitData = limit
    const offset = (page - 1) * limitData

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
        LIMIT ${limitData} OFFSET ${offset}
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
    FROM "variant" WHERE "name" ilike $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limitData} OFFSET ${offset}
    `
    console.log(sql)
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found`)
    }
    return rows
}


exports.countAll = async (searchKey='') => {
    const sql = `SELECT COUNT("id") AS "counts" FROM "variant" WHERE "name" ILIKE $1`
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    return rows[0].counts
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
    INSERT INTO "variant"("name", "additionalPrice")
    VALUES ($1, $2) RETURNING *`
    const values = [data.name, data.additionalPrice]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

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
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isExist("variant", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "variant" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}