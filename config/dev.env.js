'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CLIENTCENTER_API_SERVER_HOST: JSON.stringify('https://aaa.com')
})
