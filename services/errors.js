class Errors extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class EmailInUseError extends Errors {
  constructor(message) {
    super(message)
    this.status = 409
  }
}

class ValidationError extends Errors {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class NotAuthorizedError extends Errors {
  constructor(message) {
    super(message)
    this.status = 401
  }
}
module.exports = {
  Errors,
  EmailInUseError,
  ValidationError,
  NotAuthorizedError
}
