const express = require('express')
const draftController = require('../controllers/draftController')
const { register } = require('../controllers/userController')
const { catchErrors } = require('../middleware/errors')
const router = express.Router()

// Create and retrieve drafts
router.get('/api/draft/:slug', draftController.getDraft)
router.post('/api/create', catchErrors(draftController.createDraft))

// accounts
router.post('/api/register', catchErrors(register))

module.exports = router
