import websocket from 'socket.io-client'
import Viva from 'vivagraphjs'

class GraphWs {
  constructor (ws = websocket,
               url = 'http://localhost:8080',
               graph = Viva.Graph.graph(),
               renderer = Viva.Graph.View.renderer) {
    this.ws = ws
    this.url = url
    this.graph = graph
    this.renderer = renderer
  }

  start () {
    const socket = this.ws(this.url)

    socket.on('connect', () => {
      console.log(`${new Date()} => connect`)
    })

    socket.on('disconnect', () => {
      console.log(`${new Date()} => disconnect`)
    })

    socket.on('event', data => {
      console.log(`${new Date()} => event: ${data}`)
    })
  }
}

export default GraphWs
