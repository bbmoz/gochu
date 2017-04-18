const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const GraphWs = require('./GraphWs')

const port = 8080
const app = express()
const graphWs = new GraphWs(app)

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendfile(path.join(`${__dirname}/index.html`))
})

app.post('/modules', (req, res) => {
  console.log(`${new Date()} => ${req.body}`)
  graphWs.connection.send(req.body)
})

app.listen(port, () => {
  console.log(`${new Date()} => server is listening on port ${port}`)
})

graphWs.start()
