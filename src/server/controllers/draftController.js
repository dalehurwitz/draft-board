const mongoose = require('mongoose')
const { body } = require('express-validator/check')
const { handleValidationErrors } = require('../middleware/errors')
const { alphaNumeric } = require('../middleware/validators')
const Draft = mongoose.model('Draft')
const Team = mongoose.model('Team')

mongoose.Promise = global.Promise

exports.getDraft = async (req, res) => {
  const draft = await Draft.findOne({ slug: req.params.slug })
  res.json(draft)
}

exports.validateDraft = [
  body('name', 'Draft name is required').not().isEmpty(),
  body('name').custom(alphaNumeric('Draft name can only include numbers and letters')),
  body('teams', 'Supply at least one team').not().isEmpty(),
  body('teams.*', 'Team names cannot be empty').not().isEmpty(),
  body('teams.*').custom(alphaNumeric('Team names can only include numbers and letters')),
  handleValidationErrors
]

exports.createDraft = async (req, res, next) => {
  const { user, body } = req
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
