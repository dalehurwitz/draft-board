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
  resetToken: String,
  resetTokenExpires: Date,
  drafts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Draft'
    }
  ]
})

// userSchema.plugin(mongodbErrorHandler)

function hashPassword (password) {
  return bcrypt.hash(password, 10)
}

async function hashPasswordSave (next) {
  this.password = await hashPassword(this.password)
  next()
}

async function hashPasswordUpdate (next) {
  // If we're updating the user, ensure to only re-encrypt
  // password if it is what's being updated
  if (this._update.password) {
    this._update.password = await hashPassword(this._update.password)
  }
  next()
}

userSchema.pre('save', hashPasswordSave)
userSchema.pre('update', hashPasswordUpdate)

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
