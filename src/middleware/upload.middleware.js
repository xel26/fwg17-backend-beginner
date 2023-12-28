const multer = require('multer')                                                        // import module multer
const path = require('path')                                                            // import path = module bawaan node js. digunakna untuk membuat jalur path yg menyesuaikan karakter pemisah direktori diberbagai sistem operasi (lintas-platform). misal windows menggunakan "backslash"(\) dan macOS/Linux menggunakan "forward slash"(/)


// 1. diskStorage adalah metode yang disediakan oleh multer untuk membuat objek konfigurasi penyimpanan gambar
// 2. storage mengembalikan hasil dari pemanggilan fungsi multer.diskStorage
// 3. Callback pada properti destination digunakan untuk memberi tahu multer di mana file harus disimpan
//    Callback pada properti filename digunakna untuk menamai file tersebut
// 4. - parameter pertama null = memberitahu multer bahwa tidak ada kesalahan (error) yang terjadi, Jika ada kesalahan, nilai null dapat diganti dengan objek error yang sesuai untuk memberi tahu multer bagaimana menangani situasi tersebut.
//    - callback biasanya memiliki parameter pertama sebagai objek error atau nilai null
// 5. multer.diskStorage membuat object konfigurasi yg berisi :
//      - properti "destination" yg berisi fungsi untuk menentukan dimana gambar akan di simpan
//      - properti "filename" yg berisi fungsi untuk menentukan bagaimana penamaan file  (jika tidak diatur multer akan membuat nama acak yang tidak menyertakan ekstensi file apa pun)

const storage = (dest) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('uploads', dest))                                            // path.join('uploads', 'products') = Menggabungkan beberapa bagian jalur menjadi satu jalur lengkap
    },
    filename: (req, file, cb) => {
        console.log(file)
        const extension = {                                                             // membuat object ekstensi. yg di tentukan berdasarkan mimetype
            'image/jpeg': '.jpg',
            'image/png': '.png'
        }

        
        // filename = req.params.id
        const filename = new Date().getTime()

        cb(null, `${filename}${extension[file.mimetype]}`)
    }
})


const fileFilter = (req, file, cb) => {
    const allowedFileTypes =['.jpeg','.jpg', '.png']                                                                            // file yg diperbolehkan di upload

    const isExtnameAllowed = allowedFileTypes.includes(path.extname(file.originalname))                                         //  mengambil path(path.extname) dari file(file.originalname) untuk di cek apakah termasuk(includes) allowedFileTypes. variable "isExtnameAllowed" akan berisi nilai true atau false
    if(isExtnameAllowed){                                                                                                       // jika true file dapat di upload
        cb(null, true)
    }else{
        const errorMessage = 'The file extension is not allowed; only JPEG, JPG, and PNG are permitted'                         // jika false maka akan error dan file tidak dapat di upload
        cb(new Error(errorMessage), false)
    }
}


const limits = {
    fileSize: 500 * 1024
}


const uploadMiddleware = (dest, filename) => {
    const processUpload = multer({
        storage: storage(dest, filename),                           // untuk mengatur kemana menyimpan file
        fileFilter: fileFilter,                                     // untuk mengatur file seperti apa yg bisa di upload
        limits: limits                                              // untuk mengatur batasan terhadap file yg di upload
    })
    
    return processUpload
}

module.exports = uploadMiddleware