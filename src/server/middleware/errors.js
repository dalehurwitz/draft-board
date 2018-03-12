exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next)
  }
}

exports.apiErrors = (err, req, res, next) => {
  const errors = err.errors

  if (!errors) next()

  const message = Object.keys(errors).map(key => errors[key].message).join(', ')

  res.status(400).json({
    error: true,
    message
  })
}
