import websocket from 'socket.io-client'
import Viva from 'vivagraphjs'

class GraphWs {
  constructor (ws = websocket,
               url = 'http://localhost:8080',
               graph = Viva.Graph.graph(),
               graphics = Viva.Graph.View.webglGraphics(),
               renderer = Viva.Graph.View.renderer) {
    this.ws = ws
    this.url = url
    this.graph = graph
    this.graphics = graphics
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

    socket.on('modules', data => {
      console.log(`${new Date()} => modules: ${JSON.stringify(data)}`)
      Object.keys(data).forEach(moduleName => {
        this.graph.addNode(moduleName, data[moduleName])
      })
      this.renderer(this.graph, {
        graphics: this.graphics
      }).run()
    })
  }
}

export default GraphWs
