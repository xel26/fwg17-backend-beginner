const db = require('../lib/db.lib')
const { isExist, updateColumn } = require('../moduls/handling')


exports.findAll = async (sortBy="id", order="ASC", page, limit) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limitData = limit
    const offset = (page - 1) * limitData

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'createdAt', 'recipientId', 'senderId']
        let columnSort = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT *
        FROM "message"
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
    FROM "message"
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limitData} OFFSET ${offset}
    `
    const values = []
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found `)
    }
    return rows
}


exports.countAll = async () => {
    const sql = `SELECT COUNT("id") AS "counts" FROM "message"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows[0].counts
}


exports.findOne = async (id) => {                                                                             
    const sql = `
    SELECT *
    FROM "message" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`message with id ${id} not found `)
    }
    return rows[0]
}


exports.insert = async (body) => {
    const queryRecipientId = await isExist("users", parseInt(body.recipientId))
    if(queryRecipientId){
        throw new Error(queryRecipientId)
    }

    const querySenderId = await isExist("users", parseInt(body.senderId))
    if(querySenderId){
        throw new Error(querySenderId)
    }

    const sql = `
    INSERT INTO "message" ("recipientId", "senderId", "text")
    VALUES ($1, $2, $3) RETURNING *`
    const values = [body.recipientId, body.senderId, body.text]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isExist("message", id)
    if(queryId){
        throw new Error(queryId)
    }
    
    return await updateColumn(id, body, "message")
}


exports.delete = async (id) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isExist("message", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "message" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}