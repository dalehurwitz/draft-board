const express = require('express')
const {
  validateDraft,
  createDraft,
  getDraft
} = require('../controllers/draftController')
const {
  validateRegister,
  register,
  login,
  setToken,
  validateJWT,
  authenticate,
  checkForResetToken,
  forgotPassword,
  resetPassword,
  confirmMatchingPasswords
} = require('../controllers/authController')
const { catchErrors } = require('../middleware/errors')
const router = express.Router()

// Create and retrieve drafts
router.get('/api/draft/:slug', getDraft)
router.post(
  '/api/create/',
  validateJWT,
  validateDraft,
  catchErrors(createDraft)
)

// accounts
router.get('/api/authenticate', validateJWT, authenticate)
router.post(
  '/api/register',
  validateRegister,
  catchErrors(register),
  login,
  setToken
)
router.post('/api/login', login, setToken)
router.post('/api/forgot', catchErrors(forgotPassword))
router.post(
  '/api/reset/:token?',
  checkForResetToken,
  confirmMatchingPasswords,
  catchErrors(resetPassword)
)

module.exports = router
