const jwt = require('jsonwebtoken')
const errors = require('../services/errors')
const { User } = require('../db/usersModel')

const authMiddleware = async (req, res, next) => {
  try {
    const [token] = req.headers.authorization.split(' ')
    if (!token) {
      next(new errors.NotAuthorizedError('Not authorized'))
    }
    const user = jwt.decode(token, process.env.JWT_SECRET)
    const isUserExist = await User.findOne({ _id: user._id })
    if (!isUserExist || isUserExist.token !== token) {
      next(new errors.NotAuthorizedError('Not authorized'))
    }
    req.user = isUserExist
    next()
    return req.user
  } catch (err) {
    next(new errors.NotAuthorizedError('Not authorized'))
  }
}

module.exports = {
  authMiddleware
}
