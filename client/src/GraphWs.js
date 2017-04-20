import WS from 'ws'
import Viva from 'vivagraphjs'

class GraphWs {
  constructor (WebSocketClient = WS,
               url = 'ws://localhost:8080/',
               graph = Viva.Graph.graph(),
               renderer = Viva.Graph.View.renderer) {
    this.WebSocketClient = WebSocketClient
    this.url = url
    this.graph = graph
    this.renderer = renderer
  }

  start () {
    const webSocketClient = new this.WebSocketClient(this.url)

    webSocketClient.on('open', () => {
      console.log(`${new Date()} => connection open`)
    })

    webSocketClient.on('message', data => {
      console.log(`${new Date()} => received: ${data}`)
    })
  }
}

export default GraphWs
