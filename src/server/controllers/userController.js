const User = require('../models/User')

exports.register = async function (req, res, next) {
  const user = await User.register(
    new User({
      username: req.body.username,
      email: req.body.email
    }),
    req.body.password
  )

  res.json({
    message: 'User created!',
    user
  })
}
