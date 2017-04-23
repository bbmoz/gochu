const resolve = require('path').resolve
// $FlowFixMe
const esprima = require('esprima')
const { stripCwd } = require('./common')

class AstParser {
  parser: any
  sourceType: string
  strip: Function

  constructor (parser: any = esprima,
               sourceType: string = 'module',
               strip: Function = stripCwd) {
    this.parser = parser
    this.sourceType = 'module'
    this.strip = strip
  }

  parse (filePath: string, text: string) {
    const ast: Array<any> = this.parser.parse(text, { sourceType: this.sourceType }).body
    return {
      imports: extractImports(filePath, ast, this.strip),
      exports: extractExports(ast)
    }
  }
}

function extractImports (filePath: string, ast: Array<any>, strip: Function) {
  const imports = {}
  ast.filter(isImport)
    .forEach(importAst => {
      const sourcePath = strip(resolvePath(filePath, importAst.source.value))
      imports[sourcePath] = importAst.specifiers[0].local.name
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
  return `${resolve(stripFilePath, source)}.js`
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
