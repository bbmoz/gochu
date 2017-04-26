import test from 'ava'
import { stub, spy, match } from 'sinon'
import GraphWs from './../src/GraphWs'

test('init: instance vars', t => {
  t.is(graphWs.server, server)
  t.is(graphWs.ws, wsStub)
})

test('.start(): starts a websocket server', t => {
  graphWs.start()
  t.true(wsStub.calledWith(graphWs.server))
  ioOnSpy.calledWith('connection', match.func)
})

let graphWs, server, wsStub, ioOnSpy
test.beforeEach('setup', () => {
  server = 'any-server'
  ioOnSpy = spy()
  const ioMock = {
    on: ioOnSpy
  }
  wsStub = stub().returns(ioMock)
  graphWs = new GraphWs(server, wsStub)
})
