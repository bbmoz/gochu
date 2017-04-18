const path = require('path')
const $Html = require('html-webpack-plugin')

const config = {
  context: path.join(__dirname, 'src'),

  entry: {
    server: './index.js'
  },

  output: {
    path: path.join(__dirname, '..', 'dist', 'client'),
    filename: 'index.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },

  plugins: [
    new $Html({
      template: './index.html',
      inject: true,
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ]
}

module.exports = config
