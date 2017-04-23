const { exec, spawn } = require('child_process')
// $FlowFixMe
const logger = require('./../shared/logger')

function stop () {
  exec(`kill $(ps aux | grep [g]ochu-web | awk '{print $2}')`, error => {
    if (error) {
      logger.log(`could not stop the gochu web server, maybe already stopped?`)
    }
  })
}

function start () {
  spawn('gochu-web', {
    stdio: 'ignore',
    detached: true
  }).unref()
  setTimeout(() => {
    logger.log('http://localhost:8080')
  }, 1000)
}

module.exports = {
  stop, start
}
