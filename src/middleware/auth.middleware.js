const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        const rawToken = req.headers.authorization || ''
        const prefix = "Bearer "

        if(!rawToken.startsWith(prefix)){
            throw new Error('invalid token')
        }

        const token = rawToken.slice(prefix.length)
        req.user = jwt.verify(token, process.env.APP_SECRET || 'secretKey')
        next()

    } catch (error) {
        if(error.message === 'invalid token'){
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Internal server error`
        })
    }
}

module.exports = authMiddleware