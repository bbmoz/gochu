// $FlowFixMe
const request = require('request')
const FileReader = require('./FileReader')
const Cli = require('./Cli')
const { stop, start } = require('./proc')
const screenshot = require('./screenshot')

const fileReader = new FileReader()
const cli = new Cli()
const { target, isStart, isStop, isScreenshot } = cli

if (isStop === true) {
  stop()
} else if (isStart === true) {
  start()
} else {
  fileReader.read(target)
    .then(projectModules => {
      if (isScreenshot === true) {
        screenshot().then(() => console.log('screenshot generated in .gochu/'))
      }
      setTimeout(() => {
        request.post({
          url: 'http://localhost:8080/modules',
          json: true,
          body: projectModules
        })
      }, 1500)
    })
    .catch(error => console.log(`file read error: ${error}`))
}
