const express = require('express')
const draftController = require('../controllers/draftController')
const { catchErrors } = require('../middleware/errors')
const router = express.Router()

// Create and retrieve drafts
router.get('/api/draft/:slug', draftController.getDraft)
router.post('/api/create', catchErrors(draftController.createDraft))

module.exports = router
