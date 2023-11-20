const db = require('../lib/db.lib')
const { isExist, findBy, isStringExist, updateColumn } = require('../moduls/handling')


exports.findAll = async (searchKey='', sortBy, order, page=1) => {
    const sortByColumn = ["id", "full_name", "email", "created_at"]
    sortBy = sortByColumn.includes(sortBy)? sortBy : "id"

    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"

    const limit = 10
    const offset = (page - 1) * limit

    const sql = `
    SELECT "id", "full_name", "email", "address", "picture", "phone_number", "created_at"
    FROM "users" WHERE "full_name" ilike $1
    ORDER BY ${sortBy} ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => {                                                                             // mencari satu data berdasarkan column dengan constraint unique
    if(data.id){
        return result = await findBy("users", "id", data.id)
    }else if(data.email){
        return result = await findBy("users", "email", data.email)
    }else if(data.phone_number){
        return result = await findBy("users", "phone_number", data.phone_number)
    }else{
        throw new Error (`cannot find specific data`)
    }
}


exports.insert = async (data) => {
    const queryString = await isStringExist("users", "email", data.email)                                        // melakukan query terlebih dahulu sebelum memasukan data, untuk mengecek apakah ada data string yg sama tapi hanya berbeda huruf kecil dan huruf besarnya saja. 
    if(queryString){
        throw new Error(isStringExist)
    }

    const sql = `
    INSERT INTO "users"
    ("full_name", "email", "password", "address", "picture", "phone_number", "role")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `
    const values = [data.full_name, data.email, data.password, data.address, data.picture, data.phone_number, data.role]
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