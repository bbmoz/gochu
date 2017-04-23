//$FlowFixMe
const websocket = require('socket.io')
const logger = require('./../../shared/logger')

class GraphWs {
  server: any
  ws: any
  socket: any

  constructor (server: any,
               ws: any = websocket) {
    this.server = server
    this.ws = ws
  }

  start () {
    const io = this.ws(this.server)

    io.on('connection', socket => {
      logger.log('connection')
      this.socket = socket
    })
  }
}

module.exports = GraphWs
