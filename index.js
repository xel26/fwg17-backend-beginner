require('dotenv').config({ //  file .env berisi variable global yang nilainya bisa berubah-rubah. jadi saat data berubah tidak perlu merubah kode, hanya perlu merubah nilai di variable env
  path: './.env' //  di sebut variable lingkungan karena bersifat lokal pada "lingkungan" tertentu di mana aplikasi sedang berjalan
}) //  'dotenv' untuk membaca variabel lingkungan dari file .env . yg memilliki fungsi config() untuk mengonfigurasi (mengakses nilai di variable yg ada di file env dan menggunakan nilai-nilai tersebut dalam aplikasi)

global.path = __dirname

const express = require('express') // import module express. express adalah sebuah fungsi yg mereturn sebuah object
const cors = require('cors') // import module cors. untuk mengatasi pembatasan keamanan browser terkait permintaan lintas domain. karean berjalan di antara permintaan http dan respond sehingga disebut sebagai middleware
const morgan = require('morgan') // untuk logging. mencatat informasi terkait permintaan dan respons HTTP, seperti waktu, metode, status, dan informasi lainnya yang berguna untuk pemantauan dan pemecahan masalah

const app = express() // memanggil fungsi express yg mereturn object express

app.use(express.urlencoded({ extended: true })) //
app.use(morgan('dev')) // menambahkan middleware ke rantai penanganan permintaan. setiap kali ada permintaan HTTP, morgan akan mencatat informasi log. 'dev' adalah salah satu format log yang disediakan oleh morgan yg mencakup informasi penting seperti metode HTTP, status, waktu respons, dan alamat IP klien.
app.use(cors()) // menambahkan middleware ke rantai penanganan permintaan. setiap kali ada permintaan HTTP, cors akan di jalankan

// app.use('/uploads/products', express.static('uploads/products'))             // mengambil path lengkap untuk di front end "http://localhost:8888/uploads/products/1703311927594.jpg"
// app.use('/uploads/users', express.static('uploads/users'))
// app.use('/uploads/testimonial', express.static('uploads/testimonial'))

// split kode
app.use('/', require('./src/routers')) // mengimport module index.js yg ada di dalam folder routers yg merupakan entry point di dalam folder tersebut

app.get('/', (req, res) => { // client mengirim permintaan pengambilan data, lalu server mengirim data yang diminta menggunakan method didalam object respond
  return res.json({ // mengakses method "json" didalam object respond
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

app.listen(process.env.PORT, () => { // mengakses method "listen" di dalam object express
  console.log(`App listening on port ${process.env.PORT}`) // mengakses nilai variabel PORT di variable lingkungan (.env)
})

module.exports = app