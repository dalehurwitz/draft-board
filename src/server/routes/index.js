const express = require('express')
const draftController = require('../controllers/draftController')
const { register, login, setToken } = require('../controllers/authController')
const { catchErrors } = require('../middleware/errors')
const router = express.Router()

// Create and retrieve drafts
router.get('/api/draft/:slug', draftController.getDraft)
router.post('/api/create', catchErrors(draftController.createDraft))

// accounts
router.post('/api/register', catchErrors(register), login)
router.post('/api/login', login)

module.exports = router
