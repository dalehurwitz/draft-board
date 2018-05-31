exports.catchErrors = fn => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next)
  }
}

// Mongoose Schema errors
exports.apiErrors = (err, req, res, next) => {
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

exports.catchAllErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.error || err,
    message: err.message || undefined
  })
}
