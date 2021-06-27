const Joi = require('joi')

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }).required(),
      phone: Joi.number().required()
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      res.status(400).json({ status: 'message": "missing required name field' })
    }
    next()
  },
  updateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
      phone: Joi.number()
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      res.status(400).json({ message: 'missing fields' })
    }
    next()
  }
}
