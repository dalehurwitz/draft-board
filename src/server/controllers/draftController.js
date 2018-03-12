const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Draft = mongoose.model('Draft')
const Team = mongoose.model('Team')

exports.getDraft = async (req, res) => {
  const draft = await Draft.findOne({ slug: req.params.slug })
  res.json(draft)
}

exports.createDraft = async (req, res) => {
  const newTeams = req.body.teams.map(name => new Team({ name }))
  // use .collection.insert() instead of .save() for efficiency
  const teams = await Team.collection.insert(newTeams)
  const draft = await (new Draft({
    name: req.body.name,
    teams: teams.ops.map(team => team._id)
  })).save()

  const populatedDraft = await draft.populate('teams').execPopulate()

  res.json(populatedDraft)
}
