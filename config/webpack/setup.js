const { join } = require('path')
const webpack = require('webpack')
const ExtractText = require('extract-text-webpack-plugin')
const SWPrecache = require('sw-precache-webpack-plugin')
const Clean = require('clean-webpack-plugin')
const Copy = require('copy-webpack-plugin')
const HTML = require('html-webpack-plugin')
const uglify = require('./uglify')

const root = join(__dirname, '../..')

module.exports = isProd => {
  // base plugins array
  const plugins = [
    new Clean(['public'], { root }),
    new Copy([{ context: 'assets/', from: '**/*.*' }]),
    new HTML({
      title: 'Draft Board',
      template: 'src/index.ejs'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
    })
  ]

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({ minimize: true }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.UglifyJsPlugin(uglify),
      new ExtractText('styles.[hash].css'),
      new SWPrecache({
        minify: true,
        filename: 'sw.js',
        dontCacheBustUrlsMatching: /./,
        navigateFallback: 'index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/]
      })
    )
  } else {
    // dev only
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    )
  }

  return plugins
}
