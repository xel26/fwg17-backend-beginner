const {Pool} = require('pg')

const db = new Pool({                                                   //  Pool digunakan untuk membuat koneksi ke database
    connectionString: process.env.DATABASE_URL                          //  artinya database mana yg ingin di koneksikan. berisi nama database, user, password, alamant ip, port, dan nama database
})

db.connect((err) => {                                                  // mendapatkan atau membuka koneksi dari pool. callback akan menangani hasil apakah koneksi berhasil di buka atau tidak                                         // connect() digunakan untuk mengaktifkan koneksi yg di buat 
    if(!err){
        console.log("Connection success")
    }
})

module.exports = db