const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
// const mongodbErrorHandler = require('mongoose-mongodb-errors')

mongoose.Promise = global.Promise

const userSchema = Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  },
  username: {
    type: String,
    required: 'Please supply a username',
    trim: true
  },
  password: {
    type: String,
    required: 'Please supply a password'
  },
  resetPasswordToken: String,
  resetPasspordExpires: Date
})

// userSchema.plugin(mongodbErrorHandler)

async function hashPassword (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
}

userSchema.pre('save', hashPassword)
userSchema.pre('update', hashPassword)

userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compare(password, this.password)
}

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
