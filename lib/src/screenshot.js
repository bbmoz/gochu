// $FlowFixMe
const Pageres = require('pageres')

const config = {
  delay: 2.5,
  filename: 'screenshot-<%= date %>:<%= time %>'
}

const pageres = new Pageres(config)
  .src('http://localhost:8080', ['1600x1280'])
  .dest('.gochu/')

function screenshot () {
  return pageres.run()
}

module.exports = screenshot
