const multer = require('multer')

const multerErrorHandler = (err, req, res, next) => {
    if(err instanceof multer.MulterError){
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
    next()
}

module.exports = multerErrorHandler