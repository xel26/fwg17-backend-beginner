const db = require('../lib/db.lib')
const { isExist } = require('../moduls/handling')


exports.findAll = async (sortBy="id", order="ASC", page=1) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limit = 10
    const offset = (page - 1) * limit

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'productId', 'categoryId', 'createdAt']
        let columnSort = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT *
        FROM "productCategories"
        ORDER BY ${columnSort.join(', ')}
        LIMIT ${limit} OFFSET ${offset}
        `
        const values = []
        const {rows} = await db.query(sql, values)
        return rows
    }

    const sql = `
    SELECT *
    FROM "productCategories"
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    console.log(sortBy)
    console.log(sql)
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (id) => {                                                                             
    const sql = `
    SELECT *
    FROM "productCategories" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`productCategory with id ${id} not found `)
    }
    return rows[0]
}


exports.insert = async (body) => {
    const query = `select "productId", "categoryId" FROM "productCategories"`
    const result = await db.query(query)
    result.rows.forEach(item => {
        if(item.productId === parseInt(body.productId) && item.categoryId === parseInt(body.categoryId)){
            throw new Error(`data is already exist`)
        }
    })


    const sql = `
    INSERT INTO "productCategories" ("productId", "categoryId")
    VALUES ($1, $2) RETURNING *`
    const values = [body.productId, body.categoryId]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    const queryId = await isExist("productCategories", id)
    if(queryId){
        throw new Error(queryId)
    }
    return await updateColumn(id, body, "users")
}


exports.delete = async (id) => {
    const queryId = await isExist("productCategories", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "productCategories" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}