const db = require('../lib/db.lib')
const { isExist, isStringExist, updateColumn } = require('../moduls/handling')


exports.findAll = async (searchKey='', sortBy, order, page=1) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"

    const sortByColumn = ["id", "name", "base_price", "created_at"]
    const sortByArray = []
    sortBy.split(' ').map(item => {
       if(sortByColumn.includes(item)){
        sortByArray.push(item + ` ${order}`)
       }
    })

    const limit = 100
    const offset = (page - 1) * limit

    const sql = `
    SELECT "id", "name", "description", "base_price", "image", "created_at" 
    FROM "products" WHERE "name" ILIKE $1
    ORDER BY ${sortByArray.join(', ')}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values =[`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (id) => {
    const sql = `SELECT * FROM "products" where "id" = $1`
    let values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`data with id ${id} not found `)
    }
    return rows[0]
}


exports.insert = async (data) => {
    const queryString = await isStringExist("products", "name", data.name)
    if(queryString){
        throw new Error(isStringExist)
    }

    const sql = `
    INSERT INTO "products"
    ("name", "description", "base_price", "image", "discount", "is_recommended")
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `
    const values = [data.name, data.description, data.base_price, data.image, data.discount, data.is_recommended]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    const queryId = await isExist("products", id)                                                                     // melakukan query terlebih dahulu sebelum update, untuk mengecek apakah data yg ingin di update ada di database
    if(queryId){
        throw new Error(queryId)
    }

    if(body.email){
        const queryString = await isStringExist("products", "name", body.name)                                        // melakukan query terlebih dahulu sebelum memasukan data, untuk mengecek apakah ada data string yg sama tapi hanya berbeda huruf kecil dan huruf besarnya saja. 
        if(queryString){
            throw new Error(isStringExist)
        }
    }

    return update = await updateColumn(id, body, "products")
}


exports.delete = async (id) => {
    const queryId = await isExist("products", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "products" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}