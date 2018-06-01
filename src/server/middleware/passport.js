const passport = require('passport')
const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async function (
    username,
    password,
    done
  ) {
    const user = await User.findOne({ email: username })
    if (!user) {
      return done(null, false)
    }

    const valid = await user.comparePasswords(password)
    if (!valid) {
      return done(null, false)
    }

    return done(null, user)
  })
)
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(
  new JwtStrategy(jwtOptions, async function (jwtPayload, done) {
    const user = await User.findById(jwtPayload.userId)
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  })
)
