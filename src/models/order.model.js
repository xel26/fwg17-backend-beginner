const db = require('../lib/db.lib')
const { isExist, updateColumn } = require('../moduls/handling')



exports.findAll = async (searchKey='', sortBy="id", order="ASC", page=1) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limit = 10
    const offset = (page - 1) * limit

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'userId', 'createdAt','grandTotal', 'fullName']
        let columnSort = []
    
        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT *
        FROM "orders" WHERE "fullName" ILIKE $1
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
    FROM "orders" WHERE "fullName" ILIKE $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found`)
    }
    return rows
}


exports.findOne = async (id) => {
    const sql = `
    SELECT *
    FROM "orders" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`order with id ${id} not found `)
    }
    return rows[0]
}


exports.insert = async (body) => {
    if(body.userId){
        const queryId = await isExist("users", parseInt(body.userId))                                                                     // melakukan query terlebih dahulu sebelum update, untuk mengecek apakah data yg ingin di update ada di database
        if(queryId){
            throw new Error(queryId)
        }
    }

    const sql = `
    INSERT INTO "orders"
    ("userId", "orderNumber", "deliveryAddress", "fullName", "email")
    VALUES
    (
    $1, $2, 
    (select "address" from "users" where "id" = $1),
    (select "fullName" from "users" where "id" = $1),
    (select "email" from "users" where "id" = $1)
    )
    RETURNING *
    `
    const values = [body.userId, body.orderNumber]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isExist("orders", id)
    if(queryId){
        throw new Error(queryId)
    }

    return await updateColumn(id, body, "orders")
}


exports.delete = async (id) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isExist("orders", id)
    if(queryId){
        throw new Error(queryId)
    }

    const sql = `DELETE FROM "orders" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}