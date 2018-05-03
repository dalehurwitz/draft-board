const passport = require('passport')
const User = require('../models/User')

exports.register = async function (req, res, next) {
  await User.register(
    new User({
      username: req.body.username,
      email: req.body.email
    }),
    req.body.password
  )
  next()
}

exports.login = function (req, res, next) {
  // Custom callback is used to provide custom error messaging
  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) return next(err)

    if (!user) {
      return next({
        status: 401,
        error: 'IncorrectCredentials'
      })
    }

    req.logIn(user, function (err) {
      if (err) return next(err)
      next()
    })
  })(req, res, next)
}

exports.setToken = function (req, res, next) {
  res.json(req.user)
}
