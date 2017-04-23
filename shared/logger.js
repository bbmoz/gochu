const logger = {
  log (txt: string) {
    console.log(`${now()} => ${txt}`)
  }
}

function now() {
  return String(new Date())
}

module.exports = logger
