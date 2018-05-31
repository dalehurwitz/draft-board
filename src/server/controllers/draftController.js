const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Draft = mongoose.model('Draft')
const Team = mongoose.model('Team')

exports.getDraft = async (req, res) => {
  const draft = await Draft.findOne({ slug: req.params.slug })
  res.json(draft)
}

exports.createDraft = async (req, res, next) => {
  const { user, body } = req

  req.checkBody('teams', 'Teams array required').isArray()
  req.checkBody('teams', 'Supply at least one team').notEmpty()

  const errors = req.validationErrors()

  if (errors) {
    return next({ status: 400, error: errors })
  }

  const newTeams = body.teams.map(name => new Team({ name }))

  // use .collection.insert() instead of .save() for efficiency
  const teams = await Team.collection.insert(newTeams)
  const draft = await new Draft({
    name: body.name,
    teams: teams.ops.map(team => team._id),
    owner: user._id
  }).save()

  await user.update({ $push: { drafts: draft._id } })

  // Populated teams can be pulled directly from 'teams'
  // instead of running .populate() on 'draft'
  draft.teams = [...teams.ops]
  res.json(draft)
}
