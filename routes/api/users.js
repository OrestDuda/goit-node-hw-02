const express = require('express')
const router = express.Router()
const users = require('../../controllers/usersController')
const { asyncWrapper } = require('../../services/asyncWrapper')
const { userDataValidation } = require('../../services/userValidation')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const { uploadMiddleware } = require('../../middlewares/uploadMiddleware')

router.post('/signup', userDataValidation, asyncWrapper(users.signUpController))
router.post('/login', userDataValidation, asyncWrapper(users.loginController))
router.post('/logout', authMiddleware, asyncWrapper(users.logoutController))
router.get('/current', authMiddleware, asyncWrapper(users.getCurrentUserController))
router.patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), asyncWrapper(users.updateAvatarController))
router.post('/verify/:verificationToken', asyncWrapper(users.signupConfirmationController))

module.exports = router
