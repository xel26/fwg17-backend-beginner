const express = require('express')                                          // import module express. express adalah sebuah fungsi yg mereturn sebuah object

const app = express()                                                       // memanggil fungsi express yg mereturn object express

app.use(express.urlencoded({extended: false}))                              // app.use = mengakses method use didalam object express untuk mendaftarkan middleware express.urlencoded


app.use('/', require('./src/routers'))


app.get('/', (req, res) => {                                                // client mengirim permintaan pengambilan data, lalu server mengirim data yang diminta menggunakan method didalam object respond
  return res.json({                                                         // mengakses method "json" didalam object respond
    success: true,
    message: 'Backend is running well'
  })        
})





// Alamat "IP" seperti Alamat Rumah (Rumah = Komputer)
// "Port" seperti Ruangan didalam Rumah
/*  method "listen" adalah untuk mengaktifkan sebuah server (server = program backend yg terhubung dengan berbagai sumber daya)
    dan menentukan diruangan (port) mana program server akan dijalankan
    dan port digunakan untuk jalur/rute lalu lintas data, ke mana data harus dikirim atau dari mana data berasal
    sesuai dengan namanya "listen" sehingga saat aktif siap mendengarkan permintaan http yg masuk
*/


app.listen(8888, () => {                                            // mengakses method "listen" di dalam object express
    console.log(`App listening on port 8888`)
})