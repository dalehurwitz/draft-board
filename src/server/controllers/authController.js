const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

require('dotenv').load()

exports.register = async function (req, res, next) {
  await (new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })).save()
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
  const accessToken = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({
    accessToken,
    userId: req.user.id,
    username: req.user.username
  })
}
