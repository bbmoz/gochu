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
      const projectModules = {}
      this.globber.readdirStream(pattern)
        .on('data', file => {
          const { path } = file
          this.reader.readFile(path, (err, text) => {
            if (err) {
              reject(err)
              return
            }
            const modules = this.astParser.parse(text)
            projectModules[path] = modules
          })
        })
        .on('error', reject)
        .on('end', () => {
          resolve(projectModules)
        })
    })
  }
}

module.exports = FileReader
