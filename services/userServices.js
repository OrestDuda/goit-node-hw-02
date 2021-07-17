const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../db/usersModel')
const { Verification } = require('../db/verificationModel')
const { v4: uuidv4 } = require('uuid')
const errors = require('../services/errors')
const gravatar = require('gravatar')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

  const code = uuidv4()
  const verification = new Verification({
    code,
    userId: user._id
  })
  await verification.save()

  const msg = {
    to: body.email,
    from: 'OrestDuda@gmail.com',
    subject: 'Registration',
    text: `Please confirm your email address POST http://localhost:8080/api/users/verify/${code}`,
    html: `Please confirm your email address POST http://localhost:8080/api/users/verify/${code}`
  }
  await sgMail.send(msg)

  return User.findOne({ email: newUser.email }, { subscription: 1, email: 1, avatarURL: 1, _id: 0 })
}

const login = async (body) => {
  const userExist = await User.findOne({ email: body.email, verify: true })
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

const signupConfirmation = async (verificationToken) => {
  const verification = await Verification.findOne({
    code: verificationToken,
    active: true
  })
  if (!verification) {
    throw new errors.NotAuthorizedError('Invalid or expired confirmation code')
  }
  const user = await User.findById(verification.userId)
  if (!user) {
    throw new errors.NotAuthorizedError('No user found')
  }

  verification.active = false
  await verification.save()
  user.confirmed = true
  await user.save()

  const msg = {
    to: user.email,
    from: 'OrestDuda@gmail.com',
    subject: 'Registration',
    text: 'Registration successful',
    html: 'Registration successful'
  }
  await sgMail.send(msg)
}
module.exports = {
  signUp,
  login,
  logout,
  updateAvatar,
  signupConfirmation
}
