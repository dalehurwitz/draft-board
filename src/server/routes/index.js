const express = require('express')
const draftController = require('../controllers/draftController')
const {
  register,
  login,
  setToken,
  verifyJwt,
  checkForResetToken,
  forgotPassword,
  resetPassword,
  confirmMatchingPasswords
} = require('../controllers/authController')
const { catchErrors } = require('../middleware/errors')
const router = express.Router()

// Create and retrieve drafts
router.get('/api/draft/:slug', draftController.getDraft)
router.post('/api/create/', verifyJwt, catchErrors(draftController.createDraft))

// accounts
router.post('/api/register', catchErrors(register), login, setToken)
router.post('/api/login', login, setToken)
router.post('/api/forgot', catchErrors(forgotPassword))
router.post(
  '/api/reset/:token?',
  checkForResetToken,
  confirmMatchingPasswords,
  catchErrors(resetPassword)
)

module.exports = router
