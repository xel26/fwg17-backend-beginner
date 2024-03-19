const userModel = require('../models/user.model')
const { errorHandler, updateColumn, isStringExist } = require('../moduls/handling')
const  { v2: cloudinary } = require ("cloudinary");

exports.getProfile = async (req, res) => {
    try {                                      
        const user = await userModel.findOne(req.user.id)
        return res.json({                                                              
            success: true,
            message: 'user profile',
            results: user                                                  
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const data = await userModel.findOne(req.user.id)

        if (req.body.email){
            await isStringExist("users", "email", req.body.email)
        }


        if (req.body.picture == 'null'){
            req.body.picture = null

            cloudinary.search
            .expression(`${encodeURIComponent(data.picture)}`)
            .max_results(1)
            .execute()
            .then(result => {
                cloudinary.uploader.destroy(result.resources[0].public_id)
                .then(result => console.log({...result, message: "delete picture success"}))
                .catch(err => {
                    return errorHandler(err, res)
                })
            }).catch(err => {
                return errorHandler(err, res)
            })
        }


        if(req.file){                                                                                           
            // if(data.picture){                                                                                   // jika data sebelumnya mempunyai gambar, maka gambara akan di hapus dan di ganti dengan gambar yg baru di upload
            //     const picturePath = path.join(global.path, 'uploads', 'users', data.picture)                    // mengambil jalur path gambar
            //     fs.access(picturePath, fs.constants.R_OK).then(() => {
            //       fs.rm(picturePath);                                                                           // menghapus file berdasarkan jalur path
            //     }).catch(() => {});                                                                       
            // }

            
            if(data.picture){
                cloudinary.search
                .expression(`${encodeURIComponent(data.picture)}`)
                .max_results(1)
                .execute()
                .then(result => {
                    cloudinary.uploader.destroy(result.resources[0].public_id)
                    .then(result => console.log({...result, message: "delete picture success"}))
                    .catch(err => {
                        return errorHandler(err, res)
                    })
                }).catch(err => {
                    return errorHandler(err, res)
                })
            }
            

            console.log(req.file)
            // req.body.picture = req.file.filename
            req.body.picture = req.file.path
        }
    
        const user = await updateColumn(req.user.id, req.body, "users")

        return res.json({                                                              
            success: true,
            message: 'update profile successfully',
            results: user                                                   
        })
    } catch (error) {
        return errorHandler(error, res)
    }
}