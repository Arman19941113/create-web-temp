process.env.NODE_ENV = 'development'
process.on('unhandledRejection', err => {
  throw err
})

const startTime = Date.now()
console.log('✨ Start developing...')

const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const webpackConfig = require('../build/webpack.config')('development')
const envConfig = require('../build/env.config')('development')
const serverConfig = require('../build/devServer.config')

const compiler = webpack(webpackConfig)
const server = new webpackDevServer(compiler, serverConfig)
server.listen(envConfig.port, envConfig.host, () => {
  // the server is listening
  const seconds = ((Date.now() - startTime) / 1000).toFixed(2)
  console.log(`✨  Done in ${seconds}s`)
})
