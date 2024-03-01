// membuat fungsi untuk kode redundan



const db = require('../lib/db.lib')
const argon = require('argon2')


// exports.listAllData = async (model, table, res) => {
//     try {
//         const listData = await model.findAll()
//         return res.json({                                                              
//             success: true,
//             messages: `List all ${table.replaceAll('_', ' ')}`,
//             results: listData                                                    
//         })
//     } catch (error) {
//         return res.status(500).json({                                                              
//             success: false,
//             messages: `Internal server error`                                                    
//         })
//     }
// }


exports.isExist = async (table, id) => {
    const query = `SELECT * FROM "${table}" where "id" = ${id}`
    const {rows} = await db.query(query)
    if(!rows.length){
        throw new Error(`${table} with id ${id} not found`)
    }
    return rows
}


exports.isStringExist = async (table, uniqueColumn, searchKey) => {
    const sql = `SELECT * FROM "${table}" WHERE ${uniqueColumn} ILIKE $1`
    let values = [searchKey]
    const {rows} = await db.query(sql, values)

    if(rows.length){
        throw new Error(`${table.replace('s', '')} with ${uniqueColumn} ${searchKey} already exist`)
    }
}



exports.updateColumn = async (id, body, table) => {
    if(Object.hasOwn(body, 'password')){
        body.password = await argon.hash(body.password)
    }



    const column = Object.keys(body)
    let values = [id, ...Object.values(body)]
    const set = column.map((item, index) => {
        return `"${item}" = $${index + 2}`
    })

    if(!set.length){
        throw new Error(`No data has been modified`)
    }

    const sql = `UPDATE "${table}" SET ${set.join(', ')}, "updatedAt" = now() WHERE "id" = $1 RETURNING *`
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.errorHandler = (error, res) => {
    // console.log(error)
    if(error.code === "23502"){                                                             // kode error not null constraint
        return res.status(400).json({                                                              
            success: false,
            message: `${error.column} cannot be empty`                                                 
        })
    }else if(error.code === "23505"){                                                       // kode error unique constraint
        return res.status(400).json({                                                              
            success: false,
            message:`${error.detail.split(' ')[1].replaceAll(/[()"]/g, '').replace("=", ' ').trim()} already exist`                               
        })
    }else if(error.code === "42703"){                                                       // kode error column does not exist
        return res.status(400).json({
            success: false,
            message: error.message.replaceAll('"', '')
        })
    }else if(error.code === "22P02"){                                                       // kode error salah input type data
        return res.status(406).json({
            success: false,
            message: error.message.replaceAll('"', '')
        })
    }else if(error.code === "23503"){                                                      // kode error foreign key / keterkaitan table
        return res.status(409).json({
            success: false,
            message: error.detail.replaceAll(/[()"]/g, '').replace('=', ' ').replace('Key', 'data with').replace('.', '')
        })
    }else if(error.message.includes("found")){                                         // pesan dan status error not found
        return res.status(404).json({                                                              
            success: false,
            message: error.message                                                          // message error berasal dari error custom =>  throw new Error('message')                                               
        })
    }else if(error.message.includes("not registered") || error.message.includes("wrong password") || error.message.includes("invalid token") || error.message.includes("malformed")){             // error forbidden access = login dan otorisasi auth.middleware
            return res.status(401).json({
            success: false,
            message: error.message
            })
    }else if(error.message === 'jwt must be provided'){
        return res.status(403).json({
            success: false,
            message: error.message
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