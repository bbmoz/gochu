const fs = require('fs')
// $FlowFixMe
const glob = require('glob')
const AstParser = require('./AstParser')

class FileReader {
  globber: any
  reader: any
  astParser: any

  constructor (globber: any = glob,
               reader: any = fs,
               astParser: any = new AstParser()) {
    this.globber = globber
    this.reader = reader
    this.astParser = astParser
  }

  read (pattern: string) {
    return new Promise((resolve, reject) => {
      this.globber(pattern, (error, filePaths) => {
        if (error) reject(error)
        const projectModules = {}
        filePaths.forEach(filePath => {
          const text = this.reader.readFileSync(filePath, 'utf-8')
          const modules = this.astParser.parse(filePath, text)
          projectModules[filePath] = modules
        })
        resolve(projectModules)
      })
    })
  }
}

module.exports = FileReader
