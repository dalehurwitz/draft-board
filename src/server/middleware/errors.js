const { validationResult } = require('express-validator/check')

const mongoErrorCodes = {
  '11000': {
    error: 'USER_ALREADY_EXISTS',
    status: 401
  }
}

exports.catchErrors = fn => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next)
  }
}

// Mongoose Schema errors
exports.schemaErrors = (err, req, res, next) => {
  const errors = err.errors

  if (!errors) return next(err)

  let messages = Object.keys(errors).map(key => errors[key].message)

  if (messages.length <= 1) {
    messages = messages[0]
  }

  res.status(400).json({
    error: messages
  })
}

// MongoDB errors
exports.mongoErrors = (err, req, res, next) => {
  if (err.code && mongoErrorCodes[err.code]) {
    const { status, error } = mongoErrorCodes[err.code]
    return res.status(status).json({
      error
    })
  }
  next(err)
}

exports.catchAllErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.error || err,
    message: err.message || undefined
  })
}

exports.handleValidationErrors = function (req, res, next) {
  let errors = validationResult(req).array()
  if (errors.length) {
    errors = errors.map(error => error.msg)

    if (errors.length === 1) {
      errors = errors[0]
    }

    return res.status(400).json({ error: errors })
  }
  next()
}
