const db = require('../lib/db.lib')
const { isExist, findBy } = require('../moduls/handling')


exports.findAll = async (searchKey='', sortBy="id", order="ASC", page=1) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limit = 10
    const offset = (page - 1) * limit

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'productId', 'userId', 'rate', 'createdAt']
        let columnSort = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT *
        FROM "productRatings" WHERE "reviewMessage" ILIKE $1
        ORDER BY ${columnSort.join(', ')}
        LIMIT ${limit} OFFSET ${offset}
        `
        const values = [`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        return rows
    }

    const sql = `
    SELECT *
    FROM "productRatings" WHERE "reviewMessage" ILIKE $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    console.log(sortBy)
    console.log(sql)
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (data) => {                                                                             // mencari data berdasarkan column dengan constraint unique
    const sql = `
    SELECT *
    FROM "productRatings" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`productRating with id ${id} not found `)
    }
    return rows[0]
}


exports.insert = async (body) => {
    if(body.rate <= 0 || body.rate > 5){
        throw new Error(`Invalid body. Please rate the product on a scale from 1 to 5`)
    }

    const sql = `
    INSERT INTO "productRatings"
    ("productId", "rate", "reviewMessage", "userId")
    VALUES ($1, $2, $3, $4) RETURNING *`
    const values = [body.productId, body.rate, body.reviewMessage, body.userId]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    const queryId = await isExist("productRatings", id)
    if(queryId){
        throw new Error(queryId)
    }

    return await updateColumn(id, body, "productRatings")
}


exports.delete = async (id) => {
    const queryId = await isExist("productRatings", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "productRatings" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}