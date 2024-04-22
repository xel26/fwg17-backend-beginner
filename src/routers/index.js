const router = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleCheckMiddleware = require('../middleware/roleCheck.middleware')

router.use(
  '/admin',
  authMiddleware,
  roleCheckMiddleware('admin'),
  require('./admin')
)
router.use('/', require('./auth'))
router.use('/', require('./public'))
router.use('/', authMiddleware, require('./private'))

module.exports = router
