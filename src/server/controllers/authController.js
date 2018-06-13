const passport = require('passport')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { body } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const { equals, alphaNumeric } = require('../middleware/validators')
const { handleValidationErrors } = require('../middleware/errors')
const User = require('../models/User')
const mail = require('../lib/mail')

exports.validateRegister = [
  sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  }),
  body('username', 'Username is required')
    .not()
    .isEmpty(),
  body('username').custom(
    alphaNumeric('Username can only include numbers and letters')
  ),
  body('email', 'Email is not valid').isEmail(),
  body('password', 'Password is required')
    .not()
    .isEmpty(),
  body('password-confirm', 'Confirm your password')
    .not()
    .isEmpty(),
  body('password-confirm').custom(equals('password', 'Passwords do not match')),
  handleValidationErrors
]

exports.register = async function (req, res, next) {
  await new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).save()
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
  const accessToken = jwt.sign(
    { userId: req.user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )
  res.json({
    accessToken,
    userId: req.user.id,
    username: req.user.username
  })
}

exports.validateJWT = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) return next(err)

    if (!user) {
      return next({
        status: 401,
        error: 'InvalidToken'
      })
    }

    req.user = user
    next(null)
  })(req, res, next)
}

// If an auth token is valid return user info
exports.authenticate = function (err, req, res, next) {
  if (err) {
    if (err.error === 'InvalidToken') {
      return res.json({ authenticated: false })
    }
    return next(err)
  }

  return res.json({
    authenticated: true,
    accessToken,
    userId: req.user.id,
    username: req.user.username
  })
}

exports.forgotPassword = async function (req, res, next) {
  const successPayload = {
    message: 'An email has been sent to that address with a password reset link'
  }

  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.json(successPayload)
  }

  const resetToken = crypto.randomBytes(20).toString('hex')

  await user.update({
    resetToken,
    resetTokenExpires: Date.now() + 3600000
  })

  await mail.send({
    filename: 'email-forgot.ejs',
    email: req.body.email,
    subject: 'Draft.com: Reset your password',
    url: `http://${req.headers.host}/account/reset/${resetToken}`
  })

  res.json(successPayload)
}

exports.confirmMatchingPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    return next()
  }

  next({
    status: '401',
    error: 'PASSWORD_MISMATCH'
  })
}

exports.checkForResetToken = (req, res, next) => {
  if (req.params.token) {
    return next()
  }
  next({
    status: '401',
    error: 'MISSING_TOKEN'
  })
}

exports.resetPassword = async function (req, res, next) {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpires: { $gt: Date.now() }
  })

  if (user) {
    await user.update({ password: req.body.password })
    return res.json({
      success: true,
      message: 'PASSWORD_UPDATED'
    })
  }

  return next({
    status: '401',
    error: 'RESET_TOKEN_INVALID'
  })
}
