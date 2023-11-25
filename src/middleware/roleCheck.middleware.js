const roleCheckMiddleware = (role) => {
    return (req, res, next) => {
        if(req.user.role !== role){                                              // req.user berisi payload yg di dapat saat verifikasi token di auth.middleware dan token di dapat saat login di auth.controller
            return res.status(403).json({
                success: false,
                message: 'Forbidden access'
            })
        }
        next()
    }
}

module.exports = roleCheckMiddleware