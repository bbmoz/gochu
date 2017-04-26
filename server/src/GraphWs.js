// $FlowFixMe
const websocket = require('socket.io')

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
      console.log('connection')
      socket.on('render', () => console.log('rendered'))
      this.socket = socket
    })
  }
}

module.exports = GraphWs
