const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const teamSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'You need to provide a team name'
  },
  players: [
    { type: String }
  ]
})

module.exports = mongoose.model('Team', teamSchema)
