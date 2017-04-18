const WebSocketServer = require('websocket').server

class GraphWs {
  constructor (app,
               WSS = WebSocketServer) {
    this.WSS = WSS
    this.config = {
      httpServer: app,
      autoAcceptConnections: false
    }
  }

  start () {
    const webSocketServer = new this.WSS(this.config)

    webSocketServer.on('request', request => {
      this.connection = request.accept('echo-protocol', request.origin)
      console.log(`${new Date()} => connection from origin ${request.origin} accepted`)

      this.connection.on('message', message => {
        console.log(message)
      })

      this.connection.on('close', (reasonCode, description) => {
        console.log(`${new Date()} => peer ${this.connection.remoteAddress} disconnected`)
      })
    })
  }
}

module.exports = GraphWs
