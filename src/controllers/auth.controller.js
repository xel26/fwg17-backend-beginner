const userModel = require('../models/user.model')
const forgotModel = require('../models/ForgotPassword.model')
const argon = require('argon2')
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../moduls/handling')
const transport = require('../../mail.helper')
const db= require('../lib/db.lib')

exports.login = async (req, res) => { 
    try {
        const {email, password} = req.body                                                              // destruct data dari req.body                           
        
        if(!email){
            throw new Error(`please enter your email`)
        }
        
        const user = await userModel.findOneByEmail(email)                                              // melakukan pengecekan apakah email ada didatabase dengan kata lain apa sudah terdaftar
        if(!user){
            throw new Error(`email not registered. . . please sign up to create new account`)                                                     // jika email tidak di temukan di database maka lempar error ke catch 
        }
        
        if(!password){
            throw new Error(`please enter your password`)
        }
    
        const verify = await argon.verify(user.password, password)                                      // pengecekan apakah password benar jika tidak maka lempar error ke catch
        if(!verify){
            throw new Error(`wrong password. . . please try again`)
        }

        const payload = {                                                                               // membuat data payload yg berisi informasi penggunaa biasanya id dan role untuk membuat token
            id: user.id,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.APP_SECRET || 'secretKey')                         // membuat token yg berisi data payload dan APP_SECRET. token otomatis di simpan di http request di dalam headers authorization

        return res.json({                                                                              // server mengirim respon saat login berhasil
            success: true,
            message: `login success. . . embark your coffee journey`,
            results: {
                token: token
            }
        })

    } catch (error) {
        return errorHandler(error, res)
    }                                 
}


exports.register = async (req, res) => {                                                   // sederhananya insert data ke table users di database
    try {
        const {fullName, email, password} = req.body                                       // destruct req.body

        if(!fullName){
            throw new Error(`Full Name cannot be empty`)
        }

        if(!email){
            throw new Error(`email cannot be empty`)
        }

        const user = await userModel.findOneByEmail(email)                              // handling isStringExist di insert tidak berjalan jika methode guarding di jalankan, sehingga membuat handling error baru               
        if(user){
            throw new Error(`email ${email} already registered. . . please login`)                                                
        }

        if(!password){
            throw new Error(`password cannot be empty`)
        }

        await userModel.insert({                                                        
            fullName,
            email,
            password,                                                                    // password di hash di userModel insert
            role: "customer"
        })

        return res.json({
            success: true,
            message: 'register success. . . welcome aboard!'
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}



// exports.forgotPassword = async (req, res) => {
//     try {
//         const rawToken = req.headers.authorization || ''                                               // user yg pernah login akan memiliki token                    
//         const prefix = "Bearer "                                                                       // token tersebut bisa di pakai untuk otentikasi user, bahwa user tersebut sudah terdaftar   
//         const token = rawToken.slice(prefix.length)                                                    // di dalam token terdapat payload yg merupakan informasi user(id, role) yg bisa di gunakan untuk parameter pencarian ke database, password user mana yg ingin di ubah

//         const payload = jwt.verify(token, process.env.APP_SECRET || 'secretKey')                       // verifikasi token, jika berhasil mengembalikan id dan role user lalu di simpan di variable payload

//         const id = payload.id                                                                          // mengakses user id
//         const newPassword = req.body.password                                                          // memasukan password baru

//         await userModel.update(user.id, {password: newPassword})                                              // melakukan update password ke database

//         return res.json({
//             success: true, 
//             message: `change password success`
//         })


//     } catch (error) {
//         return errorHandler(error, res)
//     }
// }



exports.forgotPassword = async (req, res) => {
    try {
      const {email, otp, newPassword} = req.body
      
      if(email){
        await db.query('BEGIN')

        const user = await userModel.findOneByEmail(email)
        if(user){
          const { customAlphabet } = await import("nanoid");
          const rand = customAlphabet("1234567890", 6);
          const otp = rand();
  
          const request = await forgotModel.insert({
            otp,
            email: user.email,
            userId: user.id,
          });
  
          //nodemailer start
          const mailOptions = {
            from: process.env.GMAIL_EMAIL_ADDRESS,
            to: request.email,
            subject: `Ini adalah Kode OTP anda ${otp}`,
            html:`
            <div>
              <p>Masukan kode 6 digit di bawah ini untuk membuat password baru dan mendapatkan kembali akses ke akun anda</p>
              <p>${otp}</p>
              <p>Terima kasih telah membantu kami menjaga keamanan akun Anda.</p>
              <p>Tim Coffee Shop Digital App</p>
            </div>`,
          }
  
          const sendMail = async () => {
            try {
              const mailer = await transport();
              await mailer.sendMail(mailOptions);
              console.log("Email terkirim!");
            } catch (err) {
              await db.query('ROLLBACK')
              // console.log(err);
              console.log("Gagal!");
            }
          };
  
          sendMail();
          console.log(otp)
          
          await db.query('COMMIT')
          return res.json({
            success: true,
            message: `OTP has been sent to your email`,
          });
        }

         throw new Error(`email not registered. . . . please use another email`)

      }else{
        if(otp){
          await db.query('BEGIN')

          const found = await forgotModel.findOnebyOtp(otp)
          if(!found){
            throw new Error('invalid OTP code. . . please enter the correct code')
          }
  
          const user = await userModel.findOneByEmail(found.email)
  
          await userModel.update(user.id, {password: newPassword})
  
          // if(!update){
          //   throw new Error('create new password failed, try again!')
          // }
  
          await forgotModel.delete(found.id)
  
          await db.query('COMMIT')
          return res.json({
            success: true,
            message: `create new password for ${found.email} success`
          })
        }
      }
  
    } catch (err) {
      await db.query('ROLLBACK')
      return errorHandler(err, res)
    }
  }