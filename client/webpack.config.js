const path = require('path')
const $Html = require('html-webpack-plugin')

const config = {
  context: path.join(__dirname, 'src'),

  entry: {
    client: './index.js'
  },

  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'client.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },

  plugins: [
    new $Html({
      template: './index.html',
      inject: true
    })
  ],

  node: {
    fs: 'empty'
  },

  devtool: 'eval-source-map'
}

module.exports = config
