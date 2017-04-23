// $FlowFixMe
const request = require('request')
// $FlowFixMe
const yargs = require('yargs')
const FileReader = require('./FileReader')
// $FlowFixMe
const logger = require('./../../shared/logger')

const argv = yargs
  .usage('Usage: gochu [options]')
  .example(`gochu -t 'app/*.js'`, 'generate graph from js files in the app dir')
  .demandOption(['t'])
  .describe('t', 'Specify glob pattern in quotes')
  .alias('t', 'target')
  .nargs('t', 1)
  .default('t', 'example/*.js')
  .help('h')
  .argv

const fileReader = new FileReader()

console.log(argv)

fileReader.read(argv.t)
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
