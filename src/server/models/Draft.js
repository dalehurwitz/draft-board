const mongoose = require('mongoose')
const slug = require('slug')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const draftSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'You need to provide a draft name'
  },
  slug: {
    type: String
  },
  teams: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Team'
    }
  ],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

draftSchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    return next()
  }
  this.slug = slug(this.name, { lower: true })
  // find other stores with the same slug and increment
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
  const storesWithSlug = await this.constructor.find({ slug: slugRegEx })
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`
  }
  next()
})

function autopopulate (next) {
  this.populate('teams')
  next()
}

draftSchema.pre('find', autopopulate)
draftSchema.pre('findOne', autopopulate)

module.exports = mongoose.model('Draft', draftSchema)
