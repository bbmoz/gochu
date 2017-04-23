// $FlowFixMe
const request = require('request')
const FileReader = require('./FileReader')
// $FlowFixMe
const logger = require('./../../shared/logger')

const glob = process.env.TARGET
  ? process.env.TARGET
  : 'example/*.js'

const fileReader = new FileReader()

fileReader.read(glob)
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
