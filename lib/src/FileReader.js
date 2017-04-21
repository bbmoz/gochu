const fs = require('fs')
const glob = require('glob-fs')
const AstParser = require('./AstParser')

class FileReader {
  constructor (globber = glob({ gitignore: true }),
               reader = fs,
               astParser = new AstParser()) {
    this.globber = globber
    this.reader = reader
    this.astParser = astParser
  }

  read (pattern) {
    return new Promise((resolve, reject) => {
      this.globber.readdirPromise(pattern)
        .then(filePaths => {
          const projectModules = {}
          filePaths.forEach(filePath => {
            const text = this.reader.readFileSync(filePath, 'utf-8')
            const modules = this.astParser.parse(text)
            projectModules[filePath] = modules
            resolve(projectModules)
          })
        })
        .catch(reject)
    })
  }
}

module.exports = FileReader
