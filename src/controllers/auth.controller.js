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