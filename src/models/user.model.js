const db = require('../lib/db.lib')
const { isExist, isStringExist, updateColumn } = require('../moduls/handling')
const argon = require('argon2')


exports.findAll = async (searchKey='', sortBy="id", order="ASC", page=1) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limit = 10
    const offset = (page - 1) * limit

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'fullName', 'email', 'createdAt']
        let columnSort = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT *
        FROM "users" WHERE "fullName" ILIKE $1
        ORDER BY ${columnSort.join(', ')}
        LIMIT ${limit} OFFSET ${offset}
        `
        console.log(sql)
        const values = [`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found`)
        }
        return rows
    }

    const sql = `
    SELECT *
    FROM "users" WHERE "fullName" ilike $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    console.log(sql)
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
    FROM "users" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`user with id ${id} not found `)
    }
    return rows[0]
}


exports.findOneByEmail = async (email) => {  
    const sql = `
    SELECT *
    FROM "users" WHERE "email" ILIKE $1
    `
    const  values = [email]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.insert = async (body) => {
    const queryString = await isStringExist("users", "email", body.email)                                        // melakukan query terlebih dahulu sebelum memasukan data, untuk mengecek apakah ada data string yg sama tapi hanya berbeda huruf kecil dan huruf besarnya saja. 
    if(queryString){
        throw new Error(queryString)
    }

    // let role = ''
    // if(body.email === "admin@example.com" && body.password === "@adminPass"){
    //     role = "admin"
    // }else if(body.email.includes('staff') && body.password === "@staffPass"){
    //     role = "staff"
    // }else{
    //     role = "customer"
    // }

    body.password = await argon.hash(body.password)

    const sql = `
    INSERT INTO "users"
    ("fullName", "email", "password", "address", "picture", "phoneNumber", "role")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `
    const values = [body.fullName, body.email, body.password, body.address, body.picture, body.phoneNumber, body.role]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    const queryId = await isExist("users", id)                                                                     // melakukan query terlebih dahulu sebelum update, untuk mengecek apakah data yg ingin di update ada di database
    if(queryId){
        throw new Error(queryId)
    }

    if(body.email){
        const queryString =  await isStringExist("users", "email", body.email)                                       // melakukan query terlebih dahulu sebelum memasukan data, untuk mengecek apakah ada data string yg sama tapi hanya berbeda huruf kecil dan huruf besarnya saja.
        if(queryString){
            throw new Error (queryString)
        } 
    }

    return await updateColumn(id, body, "users")
}


exports.delete = async (id) => {
    if(isNaN(id)){                                                                            // error code 22P02 tidak ternotice karena ada isExist jadi lempar error custom jika data yg di masukan bukan number 
        throw new Error(`invalid input`)                            
    }            

    const queryId = await isExist("users", id)                                                 // melakukan query terlebih dahulu sebelum delete, untuk mengecek apakah data yg ingin di delete ada di database
    if(queryId){
        throw new Error(queryId)
    }

    const sql = `DELETE FROM "users" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.forgotPassword = async (id, newPassword) => {
    const sql = `UPDATE "users" SET "password" = $2 WHERE "id" = $1`
    const values = [id, newPassword]
    const {rows} = await db.query(sql, values)
    return rows[0]
}