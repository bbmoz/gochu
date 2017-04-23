const express = require('express')
const http = require('http')
const path = require('path')
const fs = require('fs')
//$FlowFixMe
const express = require('express')
//$FlowFixMe
const bodyParser = require('body-parser')
const GraphWs = require('./GraphWs')
const logger = require('./../../shared/logger')

const port = 8080
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res)
})

app.post('/modules', (req, res) => {
  logger.log(`post: ${JSON.stringify(req.body)}`)
  graphWs.socket.emit('modules', req.body)
  res.status(200).send()
})

const httpServer: any = http.createServer(app)

const graphWs = new GraphWs(httpServer)
graphWs.start()

httpServer.listen(port, () => {
  logger.log(`server is listening on port ${port}`)
})

