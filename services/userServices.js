const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../db/usersModel')
const errors = require('../services/errors')
const gravatar = require('gravatar')

const signUp = async (body) => {
  const userExist = await User.findOne({ email: body.email })
  if (userExist) {
    throw new errors.EmailInUseError('Email in use')
  }
  const newUser = {
    email: body.email,
    password: body.password,
    subscription: body.subscription || 'starter',
    avatarURL: gravatar.url(body.email, { protocol: 'http', s: '250' })
  }
  const user = new User(newUser)
  await user.save()
  return User.findOne({ email: newUser.email }, { subscription: 1, email: 1, avatarURL: 1, _id: 0 })
}

const login = async (body) => {
  const userExist = await User.findOne({ email: body.email })
  if (!userExist) {
    throw new errors.NotAuthorizedError('Email or pass not valid')
  }
  if (!await bcrypt.compare(body.password, userExist.password)) {
    throw new errors.NotAuthorizedError('Email or pass not valid')
  }
  const token = jwt.sign({ _id: userExist._id, }, process.env.JWT_SECRET)
  await User.updateOne({ email: body.email }, { $set: { token: token } })
  return token
}

const logout = async (userId) => {
  await User.updateOne({ _id: userId }, { $set: { token: null } })
}

const updateAvatar = async (body, path) => {
  await User.updateOne({ _id: body._id }, { $set: { avatarURL: path } })
  return User.findOne({ _id: body._id })
}
module.exports = {
  signUp,
  login,
  logout,
  updateAvatar
}
