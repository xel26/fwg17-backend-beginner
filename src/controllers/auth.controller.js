const userModel = require('../models/user.model')
const argon = require('argon2')
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../moduls/handling')

exports.login = async (req, res) => { 
    try {
        const {email, password} = req.body                                                              // destruct data dari req.body                           
    
        const user = await userModel.findOneByEmail(email)                                              // melakukan pengecekan apakah email ada didatabase dengan kata lain apa sudah terdaftar
        if(!user){
            throw new Error(`email not registered`)                                                     // jika email tidak di temukan di database maka lempar error ke catch 
        }
    
        const verify = await argon.verify(user.password, password)                                      // pengecekan apakah password benar jika tidak maka lempar error ke catch
        if(!verify){
            throw new Error(`wrong password`)
        }

        const payload = {                                                                               // membuat data payload yg berisi informasi penggunaa biasanya id dan role untuk membuat token
            id: user.id,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.APP_SECRET || 'secretKey')                         // membuat token yg berisi data payload dan APP_SECRET. token otomatis di simpan di http request di dalam headers authorization

        return res.json({                                                                              // server mengirim respon saat login berhasil
            success: true,
            message: `Login success`,
            results: {
                token: token
            }
        })

    } catch (error) {
        errorHandler(error, res)
    }                                 
}


exports.register = async (req, res) => {                                                   // sederhananya insert data ke table users di database
    try {
        const {fullName, email, password} = req.body                                       // destruct req.body

        await userModel.insert({
            fullName,
            email,
            password                                                                      // password di hash di userModel insert
        })

        return res.json({
            success: true,
            message: 'Register successfully'
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.forgotPassword = async (req, res) => {
    try {
        const rawToken = req.headers.authorization || ''                                               // user yg pernah login akan memiliki token                    
        const prefix = "Bearer "                                                                       // token tersebut bisa di pakai untuk otentikasi user, bahwa user tersebut sudah terdaftar   
        const token = rawToken.slice(prefix.length)                                                    // di dalam token terdapat payload yg merupakan informasi user(id, role) yg bisa di gunakan untuk parameter pencarian ke database, password user mana yg ingin di ubah

        const payload = jwt.verify(token, process.env.APP_SECRET || 'secretKey')                       // verifikasi token, jika berhasil mengembalikan id dan role user lalu di simpan di variable payload

        const id = payload.id                                                                          // mengakses user id
        const newPassword = req.body.password                                                          // memasukan password baru

        const hashedPassword = await argon.hash(newPassword)                                            // hash password
        await userModel.forgotPassword(id, hashedPassword)                                              // melakukan update password ke database

        return res.json({
            success: true, 
            message: `change password success`
        })


    } catch (error) {
        errorHandler(error, res)
    }
}