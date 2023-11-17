const db = require('../lib/db.lib')

exports.findAll = async () => {
    const sql = `SELECT * FROM "users"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (id) => {
    const sql = `SELECT * FROM "users" where id = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.insert = async (data) => {
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
    const sql = `UPDATE "users" SET "full_name" = $2 WHERE "id" = $1 RETURNING *`
    const values = [id, data.full_name]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const sql = `DELETE FROM "users" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}