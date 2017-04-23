// $FlowFixMe
import websocket from 'socket.io-client'
// $FlowFixMe
import cytoscape from 'cytoscape'
import defaultConfig from './config'

class GraphWs {
  ws: any
  url: string
  graph: any
  config: any

  constructor (ws: any = websocket,
               url: string = 'http://localhost:8080',
               graph: any = cytoscape,
               config: any = defaultConfig) {
    this.ws = ws
    this.url = url
    this.graph = graph
    this.config = config
  }

  start () {
    const socket = this.ws(this.url)

    socket.on('connect', () => {
      console.log('connect')
    })

    socket.on('disconnect', () => {
      console.log('disconnect')
    })

    socket.on('modules', data => {
      console.log('render')

      const { nodes, edges } = this.config.elements
      nodes.length = 0
      edges.length = 0

      Object.keys(data).forEach(modulePath => {
        const splitPath = modulePath.split('/')
        const id = splitPath[splitPath.length - 1].split('.js')[0]

        nodes.push({ data: { id } })

        const modules = data[modulePath]
        const { imports, exports } = modules

        Object.keys(imports).forEach(importEntry => {
          edges.push({
            data: {
              source: id,
              target: importEntry.slice(importEntry.indexOf('/') + 1),
              label: { imports, exports }
            }
          })
        })
      })

      this.graph(this.config)
    })
  }
}

export default GraphWs
