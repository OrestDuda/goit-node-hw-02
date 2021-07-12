const express = require('express')
const router = express.Router()
const users = require('../../controllers/usersController')
const { asyncWrapper } = require('../../services/asyncWrapper')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const { userDataValidation } = require('../../services/userValidation')

router.post('/signup', userDataValidation, asyncWrapper(users.signUpController))
router.post('/login', userDataValidation, asyncWrapper(users.loginController))
router.post('/logout', authMiddleware, asyncWrapper(users.logoutController))
router.get('/current', authMiddleware, asyncWrapper(users.getCurrentUserController))
router.patch('/', authMiddleware, asyncWrapper(users.updateSubscriptionController))

module.exports = router
