const userModel = require('../models/user.model')
const argon = require('argon2')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => { 
    try {
        const {email, password} = req.body                           
    
        const user = await userModel.findOneByEmail(email)
        console.log(user.role)
        if(!user){
            throw new Error(`email not registered`)
        }
    
        const verify = await argon.verify(user.password, password)
        if(!verify){
            throw new Error(`wrong password`)
        }

        const payload = {
            id: user.id,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.APP_SECRET || 'secretKey')

        if(verify){
            return res.json({
                success: true,
                message: `Login success`,
                results: {
                    token: token
                }
            })
        }
    } catch (error) {
        if(error.message === 'email not registered'){
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }else if(error.message === 'wrong password'){
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }                                 

    // if(username === "admin@mail.com" && password === "1234"){ 
    //     return res.json({                                     
    //         success: true,
    //         message: "Login success"
    //     })
    // }else{
    //     return res.json({
    //         success: false,
    //         message: "wrong username or password"
    //     })
    // }

}


exports.register = async (req, res) => {
    try {
        const {fullName, email, password} = req.body
        const hashed = await argon.hash(password)
        const users = await userModel.insert({
            fullName,
            email,
            password: hashed
        })
        return res.json({
            success: true,
            message: 'Register successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}