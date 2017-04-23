import websocket from 'socket.io-client'
import cytoscape from 'cytoscape'
import defaultConfig from './config'
import logger from './../../shared/logger'

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
<<<<<<< HEAD
      console.log(`${new Date()} => connect`)
    })

    socket.on('disconnect', () => {
      console.log(`${new Date()} => disconnect`)
    })

    socket.on('modules', data => {
      console.log(`${new Date()} => modules: ${JSON.stringify(data)}`)
=======
      logger.log('connect')
    })

    socket.on('disconnect', () => {
      logger.log('disconnect')
    })

    socket.on('modules', data => {
      logger.log(`modules: ${JSON.stringify(data)}`)
>>>>>>> b65025a... chore: bundle lib and server using rollup

      const { nodes, edges } = this.config.elements

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

      logger.log(this.config.elements)

      this.graph(this.config)
    })
  }
}

export default GraphWs
