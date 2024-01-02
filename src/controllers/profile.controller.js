const userModel = require('../models/user.model')
const { errorHandler } = require('../moduls/handling')
const path = require('path')
const fs = require('fs/promises')

exports.getProfile = async (req, res) => {
    const {id} = req.user                                        
    try {
        const user = await userModel.findOne(id)
        return res.json({                                                              
            success: true,
            message: 'detail user',
            results: user                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.updateProfile = async (req, res) => {
    try {
        // if(req.body.role){
        //     return res.status(403).json({
        //         success: false,
        //         message: 'Forbidden access denied cannot change role user'
        //     })
        // }

        const {id} = req.user
        const data = await userModel.findOne(id)

        if(req.file){                                                                                           
            if(data.picture){                                                                                   // jika data sebelumnya mempunyai gambar, maka gambara akan di hapus dan di ganti dengan gambar yg baru di upload
                const picturePath = path.join(global.path, 'uploads', 'users', data.picture)                    // mengambil jalur path gambar
                fs.access(picturePath, fs.constants.R_OK).then(() => {
                  fs.rm(picturePath);                                                                           // menghapus file berdasarkan jalur path
                });                                                                       
            }
            console.log(req.file)
            req.body.picture = req.file.filename
        }
    
        const user = await userModel.update(id, req.body)



        if(user === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                message: user                                                 
            })
        }

        return res.json({                                                              
            success: true,
            message: 'update user successfully',
            results: user                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}