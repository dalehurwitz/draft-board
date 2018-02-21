const { join } = require('path')
const ExtractText = require('extract-text-webpack-plugin')
const babelOpts = require('./babel')
const styles = require('./styles')
const setup = require('./setup')

const dist = join(__dirname, '..', '..', 'public')
const exclude = /(node_modules|bower_components)/

module.exports = env => {
  const isProd = env && env.production
  let appEntry = ['./src/client/index.js']

  if (isProd) {
    babelOpts.presets.push('babili')
  } else {
    styles.unshift({ loader: 'style-loader' })
    appEntry.unshift('webpack-hot-middleware/client?path=/__webpack_hmr')
  }

  return {
    entry: {
      app: appEntry
    },
    output: {
      path: dist,
      filename: '[name].[hash].js',
      publicPath: isProd ? '/public' : '/'
    },
    resolve: {
      alias: {
        // Run `npm install preact-compat --save`
        // 'react': 'preact-compat',
        // 'react-dom': 'preact-compat'
      }
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: exclude,
        loader: {
          loader: 'babel-loader',
          options: babelOpts
        }
      }, {
        test: /\.(sass|scss)$/,
        use: isProd ? ExtractText.extract({ fallback: 'style-loader', use: styles }) : styles
      }]
    },
    plugins: setup(isProd),
    devtool: !isProd && 'eval'
  }
}
