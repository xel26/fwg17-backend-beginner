const db = require('../lib/db.lib')
const { isExist, findBy } = require('../moduls/handling')


exports.findAll = async () => {
    const sql = `SELECT * FROM "product_categories" ORDER BY "id"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => {                                                                             
    if(data.id){
        return result = await findBy("product_categories", "id", data.id)
    }else{
        throw new Error (`cannot find specific data`)
    }
}


exports.insert = async (data) => {
    const query = `select "product_id", "category_id" FROM "product_categories"`
    const result = await db.query(query)
    const hasil = result.rows.map(item => {
        if(item.product_id === parseInt(data.product_id) && item.category_id === parseInt(data.category_id)){
            throw new Error(`data is already exist`)
        }
    })


    const sql = `
    INSERT INTO "product_categories"
    ("product_id", "category_id")
    VALUES
    ($1, $2)
    RETURNING *
    `
    const values = [data.product_id, data.category_id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, data) => {
    const queryId = await isExist("product_categories", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `UPDATE "product_categories" SET "category_id" = $2 WHERE "id" = $1 RETURNING *`
    const values = [id, data.category_id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.delete = async (id) => {
    const queryId = await isExist("product_categories", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "product_categories" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}