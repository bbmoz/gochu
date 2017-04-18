const request = require('request')
const FileReader = require('./FileReader')

const fileReader = new FileReader()

fileReader.read('./../../example/*.js')
  .then(projectModules => {
    console.log(`${new Date()} => ${projectModules}`)
    request({
      url: 'http://localhost:8080',
      method: 'POST',
      json: true,
      body: projectModules
    })
  })
  .catch(error => {
    console.log(`${new Date()} => file read error: ${error}`)
  })
