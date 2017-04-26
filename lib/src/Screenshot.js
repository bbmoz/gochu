// $FlowFixMe
const Pageres = require('pageres')

const defaultConfig = {
  delay: 2.5,
  filename: 'screenshot-<%= date %>:<%= time %>'
}

class Screenshot {
  Cam: any
  config: Object

  constructor (Cam = Pageres, config = defaultConfig) {
    this.Cam = Cam
    this.config = config
    this._init()
  }

  _init () {
    this.cam = new this.Cam(this.config)
      .src('http://localhost:8080', ['1600x1280'])
      .dest('.gochu/')
  }

  snap () {
    return this.cam.run()
  }
}

module.exports = Screenshot
