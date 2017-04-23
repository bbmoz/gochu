//$FlowFixMe
const esprima = require('esprima')

class AstParser {
  parser: any
  sourceType: string

  constructor (parser: any = esprima,
               sourceType: string = 'module') {
    this.parser = parser
    this.sourceType = 'module'
  }

  parse (text: string) {
    const ast: Array<any> = this.parser.parse(text, { sourceType: this.sourceType }).body
    return {
      imports: extractImports(ast),
      exports: extractExports(ast)
    }
  }
}

function extractImports (ast: Array<any>) {
  const imports = {}
  ast.filter(isImport)
    .forEach(importAst => {
      imports[importAst.source.value] = importAst.specifiers[0].local.name
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

function isImport (statement: any) {
  return statement.type === 'ImportDeclaration'
}

function isExport (statement: any) {
  return statement.type === 'ExportAllDeclaration' ||
      statement.type === 'ExportDefaultDeclaration' ||
      statement.type === 'ExportNamedDeclaration'
}

module.exports = AstParser
