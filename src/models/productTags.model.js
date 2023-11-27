const db = require('../lib/db.lib')
const { isExist, updateColumn } = require('../moduls/handling')


exports.findAll = async (sortBy="id", order="ASC", page, limit) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limitData = limit
    const offset = (page - 1) * limitData

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'productId', 'tagId', 'createdAt']
        let columnSort = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT * 
        FROM "productTags"
        ORDER BY ${columnSort.join(', ')}
        LIMIT ${limitData} OFFSET ${offset}
        `
        const values = []
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found `)
        }
        return rows
    }

    const sql = `
    SELECT *
    FROM "productTags"
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limitData} OFFSET ${offset}
    `
    console.log(sql)
    const values = []
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found `)
    }
    return rows
}


exports.countAll = async () => {
    const sql = `SELECT COUNT("id") AS "counts" FROM "productTags"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows[0].counts
}


exports.findOne = async (id) => {
    const sql = `
    SELECT *
    FROM "productTags" WHERE "id" = $1`
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`productTag with id ${id} not found `)
    }
    return rows[0]
}


exports.insert = async (body) => {
    const sql = `
    INSERT INTO "productTags" ("productId", "tagId")
    VALUES ($1, $2) RETURNING *`
    const values = [body.productId, body.tagId]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    const queryId = await isExist("productTags", id)
    if(queryId){
        console.log(queryId)
        throw new Error(queryId)
    }

    return await updateColumn(id, body, "productTags")
}


exports.delete = async (id) => {
    const queryId = await isExist("productTags", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "productTags" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}