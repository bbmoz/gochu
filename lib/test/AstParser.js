import test from 'ava'
import { stub } from 'sinon'
import AstParser from './../src/AstParser'

test('.parse(path, text): ast of import and export *', t => {
  const text = 'import foo from "bar"; export * from "bar";'
  const ast = astParser.parse(path, text)
  const expectedImports = { '/hello/app/bar.js': 'foo' }
  const expectedExports = { all: 'bar' }
  moduleEquals(ast, t, expectedImports, expectedExports)
})

test('.parse(path, text): ast of import and export default', t => {
  const text = 'import foo from "bar"; const a = 2; export default a;'
  const ast = astParser.parse(path, text)
  const expectedImports = { '/hello/app/bar.js': 'foo' }
  const expectedExports = { default: 'a' }
  moduleEquals(ast, t, expectedImports, expectedExports)
})

test('.parse(path, text): ast of import and export', t => {
  const text = 'import foo from "bar"; const a = 2; export { a };'
  const ast = astParser.parse(path, text)
  const expectedImports = { '/hello/app/bar.js': 'foo' }
  const expectedExports = { named: ['a'] }
  moduleEquals(ast, t, expectedImports, expectedExports)
})

test('.parse(path, text): ast of import, export, and export default', t => {
  const text = 'import foo from "bar"; import dog from "cat"; const a = 2; const b = 3; export { a }; export default b;'
  const ast = astParser.parse(path, text)
  const expectedImports = { '/hello/app/bar.js': 'foo', '/hello/app/cat.js': 'dog' }
  const expectedExports = { named: ['a'], default: 'b' }
  moduleEquals(ast, t, expectedImports, expectedExports)
})

test.todo('.parse(path, text): ast of require')

test.todo('.parse(path, text): ast of module.exports')

let astParser
let path
let stripCwdStub
test.beforeEach('setup', () => {
  path = '/hello/app/bar.js'
  stripCwdStub = stub()
  stripCwdStub.withArgs('/hello/app/bar.js').returns('bar')
  stripCwdStub.withArgs('/hello/app/cat.js').returns('cat')
  astParser = new AstParser(undefined, undefined, stripCwdStub)
})

function moduleEquals (ast, t, imports, exports) {
  t.plan(2)
  t.deepEqual(ast.imports, imports)
  t.deepEqual(ast.exports, exports)
}
