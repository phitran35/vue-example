'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  CLIENTCENTER_API_SERVER_HOST: JSON.stringify('https://aaa.com')
})
