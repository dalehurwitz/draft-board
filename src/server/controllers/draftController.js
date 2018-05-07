const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Draft = mongoose.model('Draft')
const Team = mongoose.model('Team')
const User = mongoose.model('User')

exports.getDraft = async (req, res) => {
  const draft = await Draft.findOne({ slug: req.params.slug })
  res.json(draft)
}

exports.createDraft = async (req, res, next) => {
  const user = await User.findById(req.params.userId)

  if (!user) {
    return next({ error: 'User not found' })
  }

  const newTeams = req.body.teams.map(name => new Team({ name }))

  // use .collection.insert() instead of .save() for efficiency
  const teams = await Team.collection.insert(newTeams)
  const draft = await new Draft({
    name: req.body.name,
    teams: teams.ops.map(team => team._id)
  }).save()

  await user.update({ $push: { drafts: draft._id } })

  // Populated teams can be pulled directly from 'teams'
  // instead of running .populate() on 'draft'
  draft.teams = [...teams.ops]
  res.json(draft)
}
