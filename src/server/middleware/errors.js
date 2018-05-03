exports.catchErrors = fn => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next)
  }
}

// MongoDB errors
exports.apiErrors = (err, req, res, next) => {
  const errors = err.errors

  if (!errors) return next(err)

  const message = Object.keys(errors)
    .map(key => errors[key].message)
    .join(', ')

  res.status(400).json({
    error: true,
    message
  })
}

exports.catchAllErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.error || err,
    message: err.message || undefined
  })
}
