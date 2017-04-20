const express = require('express')
const http = require('http')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const GraphWs = require('./GraphWs')

const port = 8080
const app = express()

let graphWs

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res)
})

app.post('/modules', (req, res) => {
  console.log(`${new Date()} => post: ${req.body}`)
  graphWs.connection.send(req.body)
})

const httpServer = http.createServer(app)

graphWs = new GraphWs(httpServer)
graphWs.start()

httpServer.listen(port, () => {
  console.log(`${new Date()} => server is listening on port ${port}`)
})
