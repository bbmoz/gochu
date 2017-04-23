<<<<<<< HEAD
const express = require('express')
const http = require('http')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const GraphWs = require('./GraphWs')
=======
import http from 'http'
import path from 'path'
import fs from 'fs'
//$FlowFixMe
import express from 'express'
//$FlowFixMe
import bodyParser from 'body-parser'
import GraphWs from './GraphWs'
import logger from './../../shared/logger'
>>>>>>> b65025a... chore: bundle lib and server using rollup

const port = 8080
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res)
})

app.post('/modules', (req, res) => {
<<<<<<< HEAD
  console.log(`${new Date()} => post: ${JSON.stringify(req.body)}`)
=======
  logger.log(`post: ${JSON.stringify(req.body)}`)
>>>>>>> b65025a... chore: bundle lib and server using rollup
  graphWs.socket.emit('modules', req.body)
  res.status(200).send()
})

const httpServer = http.createServer(app)

const graphWs = new GraphWs(httpServer)
graphWs.start()

httpServer.listen(port, () => {
<<<<<<< HEAD
  console.log(`${new Date()} => server is listening on port ${port}`)
})
=======
  logger.log(`server is listening on port ${port}`)
})

>>>>>>> b65025a... chore: bundle lib and server using rollup
