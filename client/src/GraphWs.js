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

    socket.on('modules', allModules => {
      console.log('render')

      const { nodes, edges } = this.config.elements
      nodes.length = 0
      edges.length = 0

      Object.keys(allModules).forEach(filePath => {
        nodes.push({
          data: {
            id: filePath
          }
        })

        const modules = allModules[filePath]
        const { imports, exports } = modules

        Object.keys(imports).forEach(importFilePath => {
          edges.push({
            data: {
              source: filePath,
              target: importFilePath,
              label: { imports, exports }
            }
          })
        })

        socket.emit('render', true)
      })

      this.graph(this.config)
    })
  }
}

export default GraphWs
