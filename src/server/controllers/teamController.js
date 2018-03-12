const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Team = mongoose.model('Team')

exports.createTeam = async (req, res) => {
  await (new Team(req.body)).save()
  res.send('done')
}
