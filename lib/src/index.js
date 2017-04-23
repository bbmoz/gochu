<<<<<<< HEAD
const request = require('request')
const FileReader = require('./FileReader')
=======
//$FlowFixMe
import request from 'request'
import FileReader from './FileReader'
import logger from './../../shared/logger'
>>>>>>> b65025a... chore: bundle lib and server using rollup

const fileReader = new FileReader()

fileReader.read('example/*.js')
  .then(projectModules => {
<<<<<<< HEAD
    console.log(`${new Date()} => ${JSON.stringify(projectModules)}`)
=======
    logger.log(`${JSON.stringify(projectModules)}`)
>>>>>>> b65025a... chore: bundle lib and server using rollup
    request.post({
      url: 'http://localhost:8080/modules',
      json: true,
      body: projectModules
    })
  })
  .catch(error => {
<<<<<<< HEAD
    console.log(`${new Date()} => file read error: ${error}`)
=======
    logger.log(`file read error: ${error}`)
>>>>>>> b65025a... chore: bundle lib and server using rollup
  })
