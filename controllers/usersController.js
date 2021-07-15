const user = require('../services/userServices')
const { User } = require('../db/usersModel')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const Jimp = require('jimp')

const signUpController = async (req, res, next) => {
  const createdUser = await user.signUp(req.body)
  return res.status(201).json({ user: createdUser })
}
const loginController = async (req, res, next) => {
  const token = await user.login(req.body)
  const userLogged = await User.findOne({ email: req.body.email })
  res.status(200).json({ token: token, user: { email: userLogged.email, subscription: userLogged.subscription } })
}

const logoutController = async (req, res, next) => {
  await user.logout(req.user._id)
  res.status(204).json({})
}
const getCurrentUserController = async (req, res, next) => {
  const currentUser = req.user
  res.status(200).json({ user: { email: currentUser.email, subscription: currentUser.subscription } })
}

const updateAvatarController = async (req, res, next) => {
  const [, extension] = req.file.originalname.split('.')
  const newName = `${uuidv4()}.${extension}`

  Jimp.read(req.file.path, (err, file) => {
    if (err) throw err
    file
      .resize(250, 250)
      .quality(100)
      .write(path.resolve(`./public/avatars/${newName}`)) // save
    fs.unlink(req.file.path, (err) => {
      if (err) throw err
    })
  })

  const currentUser = await user.updateAvatar(req.user, `./avatars/${newName}`)
  res.status(200).json({ avatarURL: currentUser.avatarURL })
}

module.exports = {
  signUpController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateAvatarController
}
