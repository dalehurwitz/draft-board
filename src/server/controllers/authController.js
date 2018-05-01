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

exports.login = passport.authenticate('local', { session: false })

exports.setToken = function (req, res, next) {
  console.log('some err')
  res.json({ user: req.user._id })
}
