export default (config, env, helpers) => {
  config.devServer = {
    quiet: true,
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
