const multer = require('multer')

const multerErrorHandler = (err, req, res, next) => {
    console.log(err)
    console.log(err.code)
    console.log(err.message)
    if(err instanceof multer.MulterError){
        if(err.code === 'LIMIT_FILE_SIZE'){
            return res.status(400).json({
                success: false,
                message: 'The file size exceeds the maximum limit of 50 KB'
            })
        }
    }else if (err.message === 'The file extension is not allowed; only JPEG, JPG, and PNG are permitted'){                              // error.message berasal dari fungsi "fileFilter" di file "upload.middleware" 
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }else{
        return res.status(500).json({
            success: false,
            message: `Internal server error`
        })
    }
}

module.exports = multerErrorHandler