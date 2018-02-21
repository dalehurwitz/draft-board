const express = require('express')
const path = require('path')
const app = express()
const isProd = process.env.NODE_ENV === 'production'

if (!isProd) {
  const webpack = require('webpack')
  const config = require('../../config/webpack')()
  const compiler = webpack(config)
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

  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, function (err, result) {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  const publicPath = path.resolve('public')
  app.use('/public', express.static(publicPath))
  app.use('*', function (req, res) {
    const indexPage = path.join(publicPath, 'index.html')
    res.sendFile(indexPage)
  })
}

app.listen(process.env.PORT || 6060, function () {
  console.log(`Express running on port ${this.address().port}`)
})
