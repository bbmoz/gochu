const websocket = require('socket.io')

class GraphWs {
  constructor (server,
               ws = websocket) {
    this.server = server
    this.ws = ws
  }

  start () {
    const io = this.ws(this.server)

    io.on('connection', socket => {
      console.log(`${new Date()} => connection`)
      this.socket = socket
    })
  }
}

module.exports = GraphWs
