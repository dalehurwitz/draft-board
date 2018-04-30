const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
// const mongodbErrorHandler = require('mongoose-mongodb-errors')
const passportLocalMongoose = require('passport-local-mongoose')

mongoose.Promise = global.Promise

const userSchema = Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  username: {
    type: String,
    required: 'Please supply a username',
    trim: true,
    unique: false
  },
  resetPasswordToken: String,
  resetPasspordExpires: Date
})

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  errorMessages: {
    UserExistsError: 'A user with that email address already exists'
  }
})
// userSchema.plugin(mongodbErrorHandler)

userSchema.statics.serializeUser = function () {
  return function (user, cb) {
    cb(null, user._id)
  }
}

userSchema.statics.deserializeUser = function () {
  var self = this

  return function (id, cb) {
    self.findOne({ _id: id }, cb)
  }
}

module.exports = mongoose.model('User', userSchema)
