const authRouter = require('express').Router()

const authController = require('../controllers/auth.controller')

authRouter.post('/login', authController.login)
authRouter.post('/register', authController.register)
authRouter.patch('/forgot-password', authController.forgotPassword)

module.exports = authRouter