// $FlowFixMe
const request = require('request')
const FileReader = require('./FileReader')
const { target, isStart, isStop, isScreenshot } = require('./cli')
const { stop, start } = require('./proc')
const screenshot = require('./screenshot')
// $FlowFixMe

const fileReader = new FileReader()

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
