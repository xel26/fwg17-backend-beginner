// membuat fungsi untuk kode redundan



const db = require('../lib/db.lib')


exports.listAllData = async (model, table, res) => {
    try {
        const listData = await model.findAll()
        return res.json({                                                              
            success: true,
            messages: `List all ${table.replaceAll('_', ' ')}`,
            results: listData                                                    
        })
    } catch (error) {
        return res.status(500).json({                                                              
            success: false,
            messages: `Internal server error`                                                    
        })
    }
}



exports.findBy = async (table, uniqueColumn, searchKey) => {
    if(isNaN(searchKey)){                                                                                                   // jika searchKey berupa string text
        const sql = `SELECT * FROM ${table} where ${uniqueColumn}::varchar ILIKE $1`                                        // maka pencarian akan menggunakan ilike agar case-insensitive
        let values = [searchKey]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`data with ${uniqueColumn.replace('_', ' ')} ${searchKey} not found `)                          // jika data tidak ditemukan maka akan melempar errro yg akan di tangkap oleh catch di file controller 
        }
        return rows[0]
    }

    const sql = `SELECT * FROM ${table} where ${uniqueColumn} = $1`
    let values = []
    values = [searchKey]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`data with ${uniqueColumn.replaceAll('_', ' ')} ${searchKey} not found `)
    }
    return rows[0]
}


exports.isExist = async (table, id) => {
    try {
        const query = `SELECT "id" FROM ${table}`
        const {rows} = await db.query(query)
        const results = rows.map(item => item.id)
        if(results.indexOf(id) === -1){
            throw new Error(`data with id ${id} not found`)
        }
    } catch (error) {
        return error.message
    }
}


exports.isStringExist = async (table, uniqueColumn, searchKey) => {
    const sql = `SELECT * FROM ${table} WHERE ${uniqueColumn} ILIKE $1`
    let values = [searchKey]
    const {rows} = await db.query(sql, values)

    if(rows.length){
        if(uniqueColumn === "name"){
            throw new Error(`${table} with ${uniqueColumn} ${rows[0].name} already exist`)
        }else if(uniqueColumn === "email"){
            throw new Error(`${uniqueColumn} ${rows[0].email} already exist`)
        }
    }
}



exports.updateColumn = async (id, body, table, ) => {
    
    const column = Object.keys(body)
    const values = [id, ...Object.values(body)]
    const set = column.map((item, index) => {
        return `"${item}" = $${index + 2}`
    })

    if(set.length < 1){
        return `No data has been modified`
    }

    const sql = `UPDATE ${table} SET ${set.join(', ')}, "updatedAt" = now() WHERE "id" = $1 RETURNING *`
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.errorHandler = (error, res) => {
    console.log(error)
    if(error.code === "23502"){                                                             // kode error not null constraint
        return res.status(400).json({                                                              
            success: false,
            message: `${error.column.replaceAll('_', ' ')} cannot be empty`                                                 
        })
    }else if(error.code === "23505"){                                                       // kode error unique constraint
        return res.status(400).json({                                                              
            success: false,
            message:`${error.detail.split(' ')[1].replaceAll(/[()="]/g, ' ').trim()} already exist`                               
        })
    }else if(error.code === "42703"){                                                       // kode error column does not exist
        return res.status(400).json({
            success: false,
            message: error.message.replaceAll('"', '')
            // `column ${error.message.split(' ')[1].replaceAll('"', '')} does not exist`
        })
    }else if(!error.code){
        return res.status(400).json({                                                              
            success: false,
            message: error.message                                                          // message error berasal dari error custom =>  throw new Error('message')                                               
        })
    }

    return res.status(500).json({                                                              
        success: false,
        messages: `Internal server error`                                                 
    })
}