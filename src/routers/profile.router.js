const profileRouter = require('express').Router()
const uploadMiddleware = require('../middleware/upload.middleware')
const multerErrorHandler = require('../middleware/multerErrorHandler.middleware')

const profileController = require('../controllers/profile.controller')

profileRouter.get('/', profileController.getProfile)
profileRouter.patch('/', uploadMiddleware('users').single('picture'), multerErrorHandler, profileController.updateProfile)

module.exports = profileRouter