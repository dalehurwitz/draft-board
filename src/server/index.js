const express = require('express')
const webpack = require('webpack')
const config = require('../../config/webpack')()
const compiler = webpack(config)
const app = express()
const isProd = process.env.NODE_ENV === 'production'

if (!isProd) {
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  app.use(webpackDevMiddleware(compiler))
  app.use(webpackHotMiddleware(compiler, {
    noInfo: true,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
    timeout: 20000,
    reload: true,
    publicPath: config.output.publicPath
  }))
}

app.listen(process.env.PORT || 6060, function () {
  console.log(`Express running on port ${this.address().port}`)
})
