const WS = require('ws').Server

class GraphWs {
  constructor (httpServer,
               WebSocketServer = WS) {
    this.httpServer = httpServer
    this.WebSocketServer = WebSocketServer
  }

  start () {
    const webSocketServer = new this.WebSocketServer({
      server: this.httpServer
    })

    webSocketServer.on('connection', ws => {
      console.log(`${new Date()} => connection open`)
      this.connection = ws
    })
  }
}

module.exports = GraphWs
