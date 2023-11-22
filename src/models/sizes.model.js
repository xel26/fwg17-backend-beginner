const db = require('../lib/db.lib')
const { isExist, findBy } = require('../moduls/handling')


exports.findAll = async (searchKey='', sortBy="id", order="ASC", page=1) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limit = 10
    const offset = (page - 1) * limit

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'size', 'additionalPrice', 'createdAt']
        let columnSort = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT *
        FROM "sizes" WHERE "size" ILIKE::varchar $1
        ORDER BY ${columnSort.join(', ')}
        LIMIT ${limit} OFFSET ${offset}
        `
        const values = [`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        return rows
    }

    const sql = `
    SELECT *
    FROM "sizes" WHERE "size" ILIKE::varchar $1
    ORDER BY "${sortBy}" ${order}
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
    SELECT *
    FROM "sizes" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`size with id ${id} not found `)
    }
    return rows[0]
}


exports.insert = async (body) => {
    const sql = `
    INSERT INTO "product_size"
    ("size", "additional_price")
    VALUES
    ($1, $2)
    RETURNING *
    `
    const values = [body.size, body.additionalPrice]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    const queryId = await isExist("sizes", id)
    if(queryId){
        throw new Error(queryId)
    }
    return await updateColumn(id, body, "sizes")
}


exports.delete = async (id) => {
    const queryId = await isExist("sizes", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "sizes" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}