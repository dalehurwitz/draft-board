export default (config, env, helpers) => {
  if (env.production) {
    config.output.publicPath = '/build'
  }
  config.devServer = {
    quiet: true,
    historyApiFallback: true,
    port: 6060,
    proxy: [
      {
        path: '/api/**',
        target: 'http://localhost:6061'
        // ...any other stuff...
      }
    ]
  }
}
