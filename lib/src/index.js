// $FlowFixMe
const request = require('request')
const FileReader = require('./FileReader')
const { target, isStart, isStop } = require('./cli')
const { stop, start } = require('./proc')
// $FlowFixMe
const logger = require('./../shared/logger')

const fileReader = new FileReader()

if (isStop === true) {
  stop()
} else if (isStart === true) {
  start()
} else {
  fileReader.read(target)
    .then(projectModules => {
      request.post({
        url: 'http://localhost:8080/modules',
        json: true,
        body: projectModules
      })
    })
    .catch(error => {
      logger.log(`file read error: ${error}`)
    })
}
