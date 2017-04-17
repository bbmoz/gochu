const path = require('path')

const config = {
  context: path.join(__dirname, 'src'),

  entry: {
    index: './index.js'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'piv.js',
    libraryTarget: 'commonjs-module'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  }
}

module.exports = config
