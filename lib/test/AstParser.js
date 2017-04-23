import test from 'ava'
import { stub } from 'sinon'
import AstParser from './../src/AstParser'

test('.parse(path, text): ast of import', t => { t.plan(2)
  const text = 'import foo from "bar"; const a = 2;'
  const ast = astParser.parse(path, text, stripCwdStub)
  t.deepEqual(ast.imports, { bar: 'foo' })
  t.deepEqual(ast.exports, {})
})

test('.parse(path, text): ast of export default', t => { t.plan(2)
  const text = 'const a = 2; export default a;'
  const ast = astParser.parse(path, text)
  t.deepEqual(ast.imports, {})
  t.deepEqual(ast.exports, { default: 'a' })
})

test('.parse(path, text): ast of import and export *', t => { t.plan(2)
  const text = 'import foo from "bar"; export * from "bar";'
  const ast = astParser.parse(path, text)
  t.deepEqual(ast.imports, { bar: 'foo' })
  t.deepEqual(ast.exports, { all: 'bar' })
})

test('.parse(path, text): ast of import and export default', t => { t.plan(2)
  const text = 'import foo from "bar"; const a = 2; export default a;'
  const ast = astParser.parse(path, text)
  t.deepEqual(ast.imports, { bar: 'foo' })
  t.deepEqual(ast.exports, { default: 'a' })
})

test('.parse(path, text): ast of import and export', t => { t.plan(2)
  const text = 'import foo from "bar"; const a = 2; export { a };'
  const ast = astParser.parse(path, text)
  t.deepEqual(ast.imports, { bar: 'foo' })
  t.deepEqual(ast.exports, { named: ['a'] })
})

test('.parse(path, text): ast of import, export, and export default', t => { t.plan(2)
  const text = 'import foo from "bar"; import dog from "cat"; const a = 2; const b = 3; export { a }; export default b;'
  const ast = astParser.parse(path, text)
  t.deepEqual(ast.imports, { bar: 'foo', cat: 'dog' })
  t.deepEqual(ast.exports, { named: ['a'], default: 'b' })
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
