import websocket from 'socket.io-client'
import cytoscape from 'cytoscape'
import defaultConfig from './config'

class GraphWs {
  constructor (ws = websocket,
               url = 'http://localhost:8080',
               graph = cytoscape,
               config = defaultConfig) {
    this.ws = ws
    this.url = url
    this.graph = graph
    this.config = config
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
        const { nodes, edges } = this.config.elements
        nodes.push({
          data: {
            id: moduleName
          }
        })
        // TODO: edges
      })
      this.graph(this.config)
    })
  }
}

export default GraphWs
