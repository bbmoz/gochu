<<<<<<< HEAD
const websocket = require('socket.io')
=======
//$FlowFixMe
import websocket from 'socket.io'
import logger from './../../shared/logger'
>>>>>>> b65025a... chore: bundle lib and server using rollup

class GraphWs {
  constructor (server,
               ws = websocket) {
    this.server = server
    this.ws = ws
  }

  start () {
    const io = this.ws(this.server)

    io.on('connection', socket => {
<<<<<<< HEAD
      console.log(`${new Date()} => connection`)
=======
      logger.log('connection')
>>>>>>> b65025a... chore: bundle lib and server using rollup
      this.socket = socket
    })
  }
}

<<<<<<< HEAD
module.exports = GraphWs
=======
export default GraphWs
>>>>>>> b65025a... chore: bundle lib and server using rollup
