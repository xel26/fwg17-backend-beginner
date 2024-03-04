// middleware otorisasi

const jwt = require('jsonwebtoken')
const { errorHandler } = require('../moduls/handling')

const authMiddleware = (req, res, next) => {
    try {                                                                                               // Saat pengguna berhasil login, server akan menghasilkan JWT atau token
        const rawToken = req.headers.authorization || ''                                                // Token otomatis disematkan/disimpan dalam permintaan pengguna (request), di dalam header Authorization sebagai Bearer token
        const prefix = "Bearer "                                                                        // token diawali kata "Bearer "

        if(!rawToken){
            throw new Error('Unauthorized')
        }

        if(!rawToken.startsWith(prefix)){                                                               // jika tidak diawali kata "Bearer " maka lempar error ke catch
            throw new Error('invalid token')
        }

        const token = rawToken.slice(prefix.length)                                                     // memotong kata "Bearer " untuk mengambil tokennya saja

        req.user = jwt.verify(token, process.env.APP_SECRET || 'secretKey')                             // verifikasi token.
                                                                                                        // jika verifikasi berhasil jwt akan mengembalikan payload dan server bisa mengakses data payload misal untuk di gunakan di rolekCheck.middleware untuk mengecek role user
                                                                                                        // req.user = membuat properti baru(user) di object request yg berisi data payload
                                                                                                        // server bisa mengakses req.user.role unutk mendapatkan data role user
                                                                                                        
        next()                                                                                          // melanjutkan ke middleware atau penanganan selanjutnya

    } catch (error) {                                                                                   // jika ada error akan di tangkap catch dan catch akan memanggil fungsi errorHandler
        // console.log(error)
        return errorHandler(error, res)
    }
}

module.exports = authMiddleware