import test from 'ava'
import { spy, stub } from 'sinon'
import Screenshot from './../src/Screenshot'

test('init: instance vars and camera', t => {
  t.is(screenshot.Cam, CamMock)
  t.deepEqual(screenshot.config, {
    delay: 2.5,
    filename: 'screenshot-<%= date %>:<%= time %>'
  })
  t.true(destSpy.calledWith('.gochu/'))
})

let screenshot, CamMock, srcStub, destSpy
test.beforeEach('setup', () => {
  srcStub = stub()
  destSpy = spy()
  srcStub.withArgs('http://localhost:8080', ['1600x1280'])
    .returns({ dest: destSpy })
  CamMock = () => {
    return {
      src: srcStub
    }
  }
  screenshot = new Screenshot(CamMock)
})
