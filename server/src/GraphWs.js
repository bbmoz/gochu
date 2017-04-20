const websocket = require('socket.io')

class GraphWs {
  constructor (server,
               ws = websocket) {
    this.server = server
    this.ws = ws
  }

  start () {
    const io = this.ws(this.server)

    io.on('connection', connection => {
      console.log(`${new Date()} => connection`)
      this.connection = connection
    })
  }
}

module.exports = GraphWs
