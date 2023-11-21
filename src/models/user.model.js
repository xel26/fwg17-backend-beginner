const db = require('../lib/db.lib')
const { isExist, isStringExist, updateColumn } = require('../moduls/handling')


exports.findAll = async (searchKey='', sortBy="id", order="ASC", page=1) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'fullName', 'email', 'createdAt']
        let sortByArray = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            sortByArray.push(item + ` ${order}`)
           }
        })

        const limit = 5
        const offset = (page - 1) * limit
    
        const sql = `
        SELECT "id", "fullName", "email", "address", "picture", "phoneNumber", "createdAt"
        FROM "users" WHERE "fullName" ILIKE $1
        ORDER BY ${sortByArray.join(', ')}
        LIMIT ${limit} OFFSET ${offset}
        `
        console.log(sql)
        const values = [`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        return rows
    }

    const limit = 5
    const offset = (page - 1) * limit

    const sql = `
    SELECT "id", "fullName", "email", "address", "picture", "phoneNumber", "createdAt"
    FROM "users" WHERE "fullName" ilike $1
    ORDER BY ${sortBy} ${order}
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
    SELECT "id", "fullName", "email", "address", "picture", "phoneNumber", "createdAt"
    FROM "users" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`data with id ${id} not found `)
    }
    return rows[0]
}


exports.insert = async (data) => {
    const queryString = await isStringExist("users", "email", data.email)                                        // melakukan query terlebih dahulu sebelum memasukan data, untuk mengecek apakah ada data string yg sama tapi hanya berbeda huruf kecil dan huruf besarnya saja. 
    if(queryString){
        throw new Error(isStringExist)
    }

    const sql = `
    INSERT INTO "users"
    ("fullName", "email", "password", "address", "picture", "phoneNumber", "role")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `
    const values = [data.fullName, data.email, data.password, data.address, data.picture, data.phoneNumber, data.role]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    const queryId = await isExist("users", id)                                                                     // melakukan query terlebih dahulu sebelum update, untuk mengecek apakah data yg ingin di update ada di database
    if(queryId){
        throw new Error(queryId)
    }

    if(body.email){
        const queryString = await isStringExist("users", "email", body.email)                                        // melakukan query terlebih dahulu sebelum memasukan data, untuk mengecek apakah ada data string yg sama tapi hanya berbeda huruf kecil dan huruf besarnya saja. 
        if(queryString){
            throw new Error(isStringExist)
        }
    }

    return update = await updateColumn(id, body, "users")
}


exports.delete = async (id) => {                                                                                   // melakukan query terlebih dahulu sebelum delete, untuk mengecek apakah data yg ingin di delete ada di database
    const queryId = await isExist("users", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "users" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}