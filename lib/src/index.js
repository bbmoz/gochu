// $FlowFixMe
const request = require('request')
const FileReader = require('./FileReader')
// $FlowFixMe
const logger = require('./../../shared/logger')

const fileReader = new FileReader()

fileReader.read('example/*.js')
  .then(projectModules => {
    logger.log(`${JSON.stringify(projectModules)}`)
    request.post({
      url: 'http://localhost:8080/modules',
      json: true,
      body: projectModules
    })
  })
  .catch(error => {
    logger.log(`file read error: ${error}`)
  })
