import test from 'ava'
import AstParser from './../src/AstParser'

test('.parse(text): ast of import', t => { t.plan(2)
  const text = 'import foo from "bar"; const a = 2;'
  const ast = astParser.parse(text)
  t.deepEqual(ast.imports, { bar: 'foo' })
  t.deepEqual(ast.exports, {})
})

test('.parse(text): ast of export default', t => { t.plan(2)
  const text = 'const a = 2; export default a;'
  const ast = astParser.parse(text)
  t.deepEqual(ast.imports, {})
  t.deepEqual(ast.exports, { default: 'a' })
})

test('.parse(text): ast of import and export *', t => { t.plan(2)
  const text = 'import foo from "bar"; export * from "bar";'
  const ast = astParser.parse(text)
  t.deepEqual(ast.imports, { bar: 'foo' })
  t.deepEqual(ast.exports, { all: 'bar' })
})

test('.parse(text): ast of import and export default', t => { t.plan(2)
  const text = 'import foo from "bar"; const a = 2; export default a;'
  const ast = astParser.parse(text)
  t.deepEqual(ast.imports, { bar: 'foo' })
  t.deepEqual(ast.exports, { default: 'a' })
})

test('.parse(text): ast of import and export', t => { t.plan(2)
  const text = 'import foo from "bar"; const a = 2; export { a };'
  const ast = astParser.parse(text)
  t.deepEqual(ast.imports, { bar: 'foo' })
  t.deepEqual(ast.exports, { named: ['a'] })
})

test('.parse(text): ast of import, export, and export default', t => { t.plan(2)
  const text = 'import foo from "bar"; import dog from "cat"; const a = 2; const b = 3; export { a }; export default b;'
  const ast = astParser.parse(text)
  t.deepEqual(ast.imports, { bar: 'foo', cat: 'dog' })
  t.deepEqual(ast.exports, { named: ['a'], default: 'b' })
})

test.todo('.parse(text): ast of require')

test.todo('.parse(text): ast of module.exports')

let astParser
test.beforeEach('setup', () => {
  astParser = new AstParser()
})
