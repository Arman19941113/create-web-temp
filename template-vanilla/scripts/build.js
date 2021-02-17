process.env.NODE_ENV = 'production'
process.on('unhandledRejection', err => {
  throw err
})

console.log('✨ Start building...')

require('fs').rmdirSync('web-dist', { recursive: true })

const chalk = require('chalk')
const webpack = require('webpack')

const webpackConfig = require('../webpack.config')('production')
const { formatBytes } = require('./util')

webpack(webpackConfig, (error, status) => {
  if (error) {
    console.log(chalk.red(error.message))
  } else {
    const result = status.toJson()
    console.log(`Compiled in ${result.outputPath}`)
    result.assets.forEach(item => {
      console.log(formatBytes(item.size) + chalk.cyan(item.name))
    })
  }
})
