const db = require('../lib/db.lib')
const { isExist, updateColumn } = require('../moduls/handling')


exports.findAll = async (sortBy="id", order="ASC", page, limit) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limitData = limit
    const offset = (page - 1) * limitData

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'additionalPrice', 'createdAt']
        let columnSort = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT *
        FROM "sizes"
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
    FROM "sizes"
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limitData} OFFSET ${offset}
    `
    console.log(sortBy)
    console.log(sql)
    const values = []
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found `)
    }
    return rows
}


exports.countAll = async () => {
    const sql = `SELECT COUNT("id") AS "counts" FROM "sizes"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows[0].counts
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
    INSERT INTO "sizes"("size", "additionalPrice") VALUES ($1, $2) RETURNING *`
    const values = [body.size, body.additionalPrice]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isExist("sizes", id)
    if(queryId){
        throw new Error(queryId)
    }
    return await updateColumn(id, body, "sizes")
}


exports.delete = async (id) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isExist("sizes", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "sizes" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    console.log(rows)
    return rows[0]
}