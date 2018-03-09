const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const { initWebpack } = require('./dev')
const routes = require('./routes')

const app = express()
const isProd = process.env.NODE_ENV === 'production'

mongoose.connect('mongodb://admin:password123@localhost:27017/draft_board?authSource=admin')
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
})

if (isProd) {
  const publicPath = path.resolve('public')
  app.use('/public', express.static(publicPath))
  app.use('*', function (req, res) {
    const indexPage = path.join(publicPath, 'index.html')
    res.sendFile(indexPage)
  })
} else {
  initWebpack(app)
}

app.use('/', routes)

app.listen(process.env.PORT || 6060, function () {
  console.log(`Express running on port ${this.address().port}`)
})
