const userModel = require('../../models/user.model')
const { errorHandler } = require('../../moduls/handling')
const path = require('path')
const fs = require('fs/promises')
const  { v2: cloudinary } = require ("cloudinary");


exports.getAllUsers = async (req, res) => { 
    try {
        const {searchKey, sortBy, order, page=1, limit} = req.query
        const limitData = parseInt(limit) || 5

        const count = await userModel.countAll(searchKey)      
        const listUsers = await userModel.findAll(searchKey, sortBy, order, page, limitData)
        
        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({                                                              
            success: true,
            message: `List all users`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage > 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listUsers                                                    
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getDetailUser = async (req, res) => {                                        
    try {
        const user = await userModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            message: 'detail user',
            results: user                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createUser = async (req, res) => {
    try {
        if(req.file){
            console.log(req.file)
            // req.body.picture = req.file.filename
            req.body.picture = req.file.path
        }

        const user = await userModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create user successfully',
            results: user                                                   
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.updateUser = async (req, res) => {
    try {
        // if(req.body.role){
        //     return res.status(403).json({
        //         success: false,
        //         message: 'Forbidden access denied cannot change role user'
        //     })
        // }

        const {id} = req.params
        const data = await userModel.findOne(id)
        if(!data){
            throw new Error(`user with id ${id} not found`)
        }

        if(req.file){   

            // if(data.picture){                                                                                   // jika data sebelumnya mempunyai gambar, maka gambara akan di hapus dan di ganti dengan gambar yg baru di upload
            //     const picturePath = path.join(global.path, 'uploads', 'users', data.picture)                    // mengambil jalur path gambar
            //     fs.access(picturePath, fs.constants.R_OK).then(() => {
            //         fs.rm(picturePath)                                                                  // menghapus file berdasarkan jalur path
            //     }).catch(() => {});                                                                        // menghapus file berdasarkan jalur path
            // }


            
        if(data.picture){
            cloudinary.search
            .expression(`${encodeURIComponent(data.picture)}`)
            .max_results(1)
            .execute()
            .then(result => {
                cloudinary.uploader.destroy(result.resources[0].public_id)
                .then(result => console.log({...result, message: "delete picture success"}))
                .catch(() => {})
            }).catch(() => {})
        }


            console.log(req.file)
            // req.body.picture = req.file.filename
            req.body.picture = req.file.path
        }
    
        const user = await userModel.update(parseInt(id), req.body)



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


exports.deleteUser = async (req, res) => {
    try {
        const user = await userModel.delete(parseInt(req.params.id)) 

        // if(user.picture){
        //     const picturePath = path.join(global.path, "uploads", "users", user.picture)                        // mengambil jalur path picture
        //     console.log(picturePath)
        //     fs.access(picturePath, fs.constants.R_OK).then(() => {
        //         fs.rm(picturePath)                                                                  // menghapus file berdasarkan jalur path
        //     }).catch(() => {});                                                                           // menghapus file berdasarkan jalur path
        // }


        if(user.picture){
            cloudinary.search
            .expression(`${encodeURIComponent(user.picture)}`)
            .max_results(1)
            .execute()
            .then(result => {
                cloudinary.uploader.destroy(result.resources[0].public_id)
                .then(result => console.log({...result, message: "delete picture success"}))
                .catch(err => console.log(err))
            }).catch(err => console.log(err))
        }


        return res.json({                                                              
            success: true,
            message: 'delete user successfully',
            results: user                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}