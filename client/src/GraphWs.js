import websocket from 'websocket'
import Viva from 'vivagraphjs'

class GraphWs {
  constructor (WSC = websocket.client,
               url = 'ws://localhost:8080',
               graph = Viva.Graph.graph(),
               renderer = Viva.Graph.View.renderer) {
    this.WSC = WSC
    this.url = url
    this.graph = graph
    this.renderer = renderer
  }

  start () {
    const webSocketClient = new this.WSC()

    webSocketClient.on('connectFailed', error => {
      console.log(`${new Date()} => connection failed: ${error.toString()}`)
    })

    webSocketClient.on('connect', connection => {
      connection.on('error', error => {
        console.log(`${new Date()} => connected error: ${error.toString()}`)
      })

      connection.on('close', () => {
        console.log(`${new Date()} => connection closed`)
      })

      connection.on('message', modules => {
        console.log(modules)
      })
    })

    webSocketClient.connect(this.url, 'echo-protocol')
  }
}

export default GraphWs
