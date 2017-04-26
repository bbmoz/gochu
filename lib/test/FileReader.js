import test from 'ava'
import { spy, match } from 'sinon'
import FileReader from './../src/FileReader'

test('init: instance vars', t => {
  t.is(fileReader.globber, globberSpy)
  t.is(fileReader.reader, 'any-reader')
  t.is(fileReader.astParser, 'any-parser')
})

test('.read()', t => {
  const pattern = 'example/**/*.js'
  const modules = fileReader.read(pattern)
  t.true(globberSpy.calledWith(pattern, match.func))
  t.is(typeof modules, 'object')
})

test.todo('astParser')
test.todo('reader')

let fileReader, globberSpy
test.beforeEach('setup', () => {
  globberSpy = spy()
  fileReader = new FileReader(globberSpy, 'any-reader', 'any-parser')
})
