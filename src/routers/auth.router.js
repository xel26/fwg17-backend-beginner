const authRouter = require('express').Router()

const authController = require('../controllers/auth.controller')

authRouter.post('/login', authController.login)

module.exports = authRouter