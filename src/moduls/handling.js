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
            throw new Error(`${uniqueColumn} ${rows[0].email} already registered`)
        }
    }
}



exports.errorHandler = (error, res) => {
    console.log(error)
    if(!error.code){                                                                    // jika error tanpa kode, artinya error tersebut berasal dari error custom yg saya lempar (throw new Error('messag')) sehingga kode ini di gunakan untuk mengakses pesan error custom yg saya buat
        return res.status(404).json({                                                              
            success: false,
            messages: error.message,                                                  
        })
    }
    
    return res.status(500).json({                                                              
        success: false,
        messages: `Internal server error`,                                                  
    })
}


exports.errorWithCode = (error, res, messageError) => {
    console.log(error)
    if(error.code === "23502"){                                                             // kode error not null constraint
        return res.status(400).json({                                                              
            success: false,
            messages: `${error.column.replaceAll('_', ' ')} cannot be empty`                                                 
        })
    }else if(error.code === "23505"){                                                       // kode error unique constraint
        return res.status(400).json({                                                              
            success: false,
            messages: messageError                                    
        })
    }else if(!error.code){
        return res.status(400).json({                                                              
            success: false,
            messages: error.message                                               
        })
    }

    return res.status(500).json({                                                              
        success: false,
        messages: `Internal server error`                                                 
    })
}