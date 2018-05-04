const passport = require('passport')
const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const User = mongoose.model('User')

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async function (username, password, done) {
      const user = await User.findOne({ email: username })
      if (!user) { return done(null, false) }

      const valid = await user.comparePasswords(password)
      if (!valid) {
        return done(null, false)
      }

      return done(null, user)
    }
  )
)
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
