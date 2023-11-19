const db = require('../lib/db.lib')
const { isExist, findBy, isStringExist } = require('../moduls/handling')


exports.findAll = async () => {
    const sql = `SELECT * FROM "users" ORDER BY "id"`
    const values = []
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


exports.update = async (id, data) => {
    const queryId = await isExist("users", id)                                                                     // melakukan query terlebih dahulu sebelum update, untuk mengecek apakah data yg ingin di update ada di database
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `UPDATE "users" SET "full_name" = $2 WHERE "id" = $1 RETURNING *`
    const values = [id, data.full_name]
    const {rows} = await db.query(sql, values)
    return rows[0]
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