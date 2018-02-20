const { join } = require('path')
const ExtractText = require('extract-text-webpack-plugin')
const babelOpts = require('./babel')
const styles = require('./styles')
const setup = require('./setup')

const dist = join(__dirname, '..', '..', 'public')
const exclude = /(node_modules|bower_components)/

module.exports = env => {
  const isProd = env && env.production
  let entry = {
    app: './src/client/index.js'
  }

  if (isProd) {
    babelOpts.presets.push('babili')
  } else {
    styles.unshift({ loader: 'style-loader' })

    entry = Object.assign({
      hot: 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    }, entry)
  }

  return {
    entry,
    output: {
      path: dist,
      filename: '[name].[hash].js',
      publicPath: '/'
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
