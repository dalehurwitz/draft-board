const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const errorMiddleware = require('./middleware/errors')

const app = express()
const isProd = process.env.NODE_ENV === 'production'

require('dotenv').load()

const { DB_HOST, DB_USER, DB_PASSWORD, DB_AUTHSOURCE } = process.env

// import models
require('./models/Team')
require('./models/Draft')
require('./models/User')

require('./middleware/passport')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())

app.use('/', require('./routes'))
app.use(errorMiddleware.schemaErrors)
app.use(errorMiddleware.mongoErrors)
app.use(errorMiddleware.catchAllErrors)

mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}?authSource=${DB_AUTHSOURCE}`
)
mongoose.Promise = global.Promise
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
})

if (isProd) {
  const publicPath = path.resolve('build')
  app.use('/build', express.static(publicPath))
  app.use('*', function (req, res) {
    const indexPage = path.join(publicPath, 'index.html')
    res.sendFile(indexPage)
  })
}

app.listen(6061, function () {
  console.log(`Express running on port ${this.address().port}`)
})
