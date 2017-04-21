const request = require('request')
const path = require('path')
const FileReader = require('./FileReader')

const fileReader = new FileReader()

fileReader.read('example/*.js')
  .then(projectModules => {
    console.log(`${new Date()} => ${JSON.stringify(projectModules)}`)
    request.post({
      url: 'http://localhost:8080/modules',
      json: true,
      body: projectModules
    })
  })
  .catch(error => {
    console.log(`${new Date()} => file read error: ${error}`)
  })

