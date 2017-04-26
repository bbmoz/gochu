const { exec, spawn } = require('child_process')

function stop () {
  exec(`kill $(ps aux | grep [g]ochu-web | awk '{print $2}')`, error => {
    if (error) {
      console.log(`could not stop the gochu web server, maybe already stopped?`)
    } else {
      console.log('stopped http://localhost:8080')
    }
  })
}

function start () {
  spawn('gochu-web', {
    stdio: 'ignore',
    detached: true
  }).unref()
  setTimeout(() => {
    console.log('started http://localhost:8080')
  }, 1000)
}

module.exports = {
  stop, start
}
