const multer = require('multer')                                                        // import module multer
const path = require('path')                                                            // import path = module bawaan node js. digunakna untuk membuat jalur path yg menyesuaikan karakter pemisah direktori diberbagai sistem operasi (lintas-platform). misal windows menggunakan "backslash"(\) dan macOS/Linux menggunakan "forward slash"(/)


// 1. diskStorage adalah metode yang disediakan oleh multer untuk membuat objek konfigurasi penyimpanan gambar
// 2. storage mengembalikan hasil dari pemanggilan fungsi multer.diskStorage
// 3. Callback pada properti destination dan filename digunakan untuk memberikan tahu multer di mana berkas harus disimpan dan bagaimana nama berkas tersebut harus dinamai
// 4. - parameter pertama null = memberitahu multer bahwa tidak ada kesalahan (error) yang terjadi, Jika ada kesalahan, nilai null dapat diganti dengan objek error yang sesuai untuk memberi tahu multer bagaimana menangani situasi tersebut.
//    - callback biasanya memiliki parameter pertama sebagai objek error atau nilai null
// 5. multer.diskStorage membuat object konfigurasi yg berisi :
//      - properti "destination" yg berisi fungsi untuk menentukan dimana gambar akan di simpan
//      - properti "filename" yg berisi fungsi untuk menentukan bagaimana penamaan file  (jika tidak diatur multer akan membuat nama acak yang tidak menyertakan ekstensi file apa pun)

const storage = (dest, filename) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('uploads', dest))                                            // path.join('uploads', 'products') = Menggabungkan beberapa bagian jalur menjadi satu jalur lengkap
    },
    filename: (req, file, cb) => {
        console.log(file)
        const extension = {                                                             // membuat object ekstensi. yg di tentukan berdasarkan mimetype
            'image/jpeg': '.jpg',
            'image/png': '.png'
        }
        if(!filename){
            // filename = req.params.id                                                 // jika tidak memberikan namaFile maka nama file adalah id dari products
            if(file.mimetype === 'image/jpeg'){
                filename= file.originalname.replace('.jpeg', '')
            }
        }
        cb(null, `${filename}${extension[file.mimetype]}`)
    }
})

const uploadMiddleware = (dest, filename) => {
    const processUpload = multer({
        storage: storage(dest, filename)
    })
    return processUpload
}

module.exports = uploadMiddleware