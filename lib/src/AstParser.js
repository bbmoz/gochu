const join = require('path').join
// $FlowFixMe
const esprima = require('esprima')

class AstParser {
  parser: any
  sourceType: string

  constructor (parser: any = esprima,
               sourceType: string = 'module') {
    this.parser = parser
    this.sourceType = 'module'
  }

  parse (filePath: string, text: string) {
    const ast: Array<any> = this.parser.parse(text, { sourceType: this.sourceType }).body
    return {
      imports: extractImports(filePath, ast),
      exports: extractExports(ast)
    }
  }
}

function extractImports (filePath: string, ast: Array<any>) {
  const imports = {}
  ast.filter(isImport)
    .forEach(importAst => {
      const source = importAst.source.value
      const sourcePath = resolvePath(filePath, source)
      imports[sourcePath] = importAst.specifiers.length === 0
        ? source.substr(source.indexOf('./') + 2)
        : importAst.specifiers[0].local.name
    })
  return imports
}

function extractExports (ast: Array<any>) {
  const exports = {}
  ast.filter(isExport)
    .forEach(exportAst => {
      switch (exportAst.constructor.name) {
        case 'ExportAllDeclaration':
          exports.all = exportAst.source.value
          break
        case 'ExportDefaultDeclaration':
          exports.default = exportAst.declaration.name
          break
        case 'ExportNamedDeclaration':
          exports.named = []
          exportAst.specifiers.forEach(specifier => {
            exports.named.push(specifier.exported.name)
          })
          break
      }
    })
  return exports
}

function resolvePath (filePath: string, source: string) {
  const stripFilePath = filePath.substr(0, filePath.lastIndexOf('/'))
  return `${join(stripFilePath, source)}.js`
}

function isImport (statement: any) {
  return statement.type === 'ImportDeclaration'
}

function isExport (statement: any) {
  return statement.type === 'ExportAllDeclaration' ||
      statement.type === 'ExportDefaultDeclaration' ||
      statement.type === 'ExportNamedDeclaration'
}

module.exports = AstParser
